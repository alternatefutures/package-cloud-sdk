// @ts-nocheck
import {
  DomainNotFoundError,
  DomainsNotFoundError,
} from '@alternatefutures/errors';
import {
  Client,
  Domain as DomainWithRelations,
  DomainGenqlSelection,
  Zone as ZoneWithRelations,
  ZoneGenqlSelection,
} from '@alternatefutures/utils-genql-client';

import {
  isDomainResponseQuery,
  isDomainsResponseQuery,
} from '../utils/graphql';

type DomainsClientOptions = {
  graphqlClient: Client;
};

export type Domain = Pick<
  DomainWithRelations,
  | 'id'
  | 'zone'
  | 'hostname'
  | 'isVerified'
  | 'updatedAt'
  | 'createdAt'
  | 'dnsConfigs'
  | 'status'
> & {
  // New fields for custom domains with SSL
  verified?: boolean;
  domainType?: 'WEB2' | 'ARNS' | 'ENS' | 'IPNS';
  txtVerificationToken?: string;
  txtVerificationStatus?: 'PENDING' | 'VERIFIED' | 'FAILED';
  dnsVerifiedAt?: string;
  sslStatus?: 'NONE' | 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'FAILED';
  sslIssuedAt?: string;
  sslExpiresAt?: string;
  sslAutoRenew?: boolean;
  arnsName?: string;
  ensName?: string;
  ipnsHash?: string;
  lastDnsCheck?: string;
  dnsCheckAttempts?: number;
  expectedCname?: string;
  expectedARecord?: string;
};

export type Zone = Pick<
  ZoneWithRelations,
  'id' | 'originUrl' | 'createdAt' | 'updatedAt' | 'type' | 'status'
>;

export class DomainsClient {
  private graphqlClient: Client;

  private static DOMAIN_MAPPED_PROPERTIES: DomainGenqlSelection = {
    id: true,
    zone: { id: true, __typename: true },
    hostname: true,
    isVerified: true,
    updatedAt: true,
    createdAt: true,
    dnsConfigs: {
      id: true,
      type: true,
      name: true,
      value: true,
      createdAt: true,
      updatedAt: true,
      __typename: true,
    },
    status: true,
    __typename: true,
  };

  private static ZONE_MAPPED_PROPERTIES: ZoneGenqlSelection = {
    id: true,
    originUrl: true,
    createdAt: true,
    updatedAt: true,
    type: true,
    status: true,
    __typename: true,
  };

  constructor(options: DomainsClientOptions) {
    this.graphqlClient = options.graphqlClient;
  }

  // TODO: Check which is the right type
  // Promise<DomainsWithAggregation["data"]> fails for some reason
  public list = async () => {
    const response = await this.graphqlClient.query({
      __name: 'GetDomains',
      domains: {
        data: {
          ...DomainsClient.DOMAIN_MAPPED_PROPERTIES,
        },
        __typename: true,
      },
    });

    // TODO: The genql provides `isDomain`
    // But found that for the concurrent `isDomainWithAggregation`
    // used in other parts of the source, would not be
    // correctly computed. Thus, provide a costum utility method
    // to safe-guard. Although, when type/fields change these
    // have to be computed manually. So, would be best to
    // investigate what caused the change.
    if (!isDomainsResponseQuery(response.domains?.data)) {
      throw new DomainsNotFoundError();
    }

    return response.domains.data;
  };

  public get = async ({ domainId }: { domainId: string }) => {
    const response = await this.graphqlClient.query({
      __name: 'GetDomainById',
      domain: {
        __args: {
          where: {
            id: domainId,
          },
        },
        ...DomainsClient.DOMAIN_MAPPED_PROPERTIES,
      },
    });

    if (!isDomainResponseQuery(response.domain)) {
      throw new DomainNotFoundError({ domain: { id: domainId } });
    }

    return response.domain;
  };

  public getByHostname = async ({
    hostname,
  }: { hostname: string }): Promise<DomainWithRelations> => {
    const response = await this.graphqlClient.query({
      __name: 'GetDomainByHostname',
      domainByHostname: {
        __args: {
          where: {
            hostname,
          },
        },
        ...DomainsClient.DOMAIN_MAPPED_PROPERTIES,
      },
    });

    if (!isDomainResponseQuery(response.domainByHostname)) {
      throw new DomainNotFoundError({ domain: { hostname } });
    }

    return response.domainByHostname;
  };

  public listByZoneId = async ({ zoneId }: { zoneId: string }) => {
    const response = await this.graphqlClient.query({
      __name: 'GetDomainsByZoneId',
      domainsByZoneId: {
        __args: {
          where: {
            zoneId,
          },
        },
        data: {
          ...DomainsClient.DOMAIN_MAPPED_PROPERTIES,
        },
        __typename: true,
      },
    });

    if (!isDomainsResponseQuery(response.domainsByZoneId?.data)) {
      throw new DomainsNotFoundError();
    }

    return response.domainsByZoneId.data;
  };

  public createDomain = async ({
    zoneId,
    hostname,
  }: { zoneId: string; hostname: string }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'CreateDomain',
      createDomain: {
        __args: {
          where: {
            zoneId,
          },
          data: {
            hostname,
          },
        },
        // TODO: The `DOMAIN_MAPPED_PROPERTIES` when used here
        // seem to break the query. Thus, using `__scalar` true.
        // Ideally, check what cause need for this change.
        __scalar: true,
      },
    });

    return response.createDomain;
  };

  public deleteDomain = async ({ domainId }: { domainId: string }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'DeleteDomain',
      deleteDomain: {
        __args: {
          where: {
            id: domainId,
          },
        },
        ...DomainsClient.DOMAIN_MAPPED_PROPERTIES,
      },
    });

    return response.deleteDomain;
  };

  public verifyDomain = async ({ domainId }: { domainId: string }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'VerifyDomain',
      verifyDomain: {
        __args: {
          where: {
            id: domainId,
          },
        },
        ...DomainsClient.DOMAIN_MAPPED_PROPERTIES,
      },
    });

    return response.verifyDomain;
  };

  public listZones = async (): Promise<Zone[]> => {
    const response = await this.graphqlClient.query({
      __name: 'ListZones',
      zones: { data: DomainsClient.ZONE_MAPPED_PROPERTIES },
    });

    return response.zones.data;
  };

  public getZone = async ({ id }: { id: string }): Promise<Zone> => {
    const response = await this.graphqlClient.query({
      __name: 'GetZone',
      zone: {
        __args: {
          where: {
            id,
          },
        },
        ...DomainsClient.ZONE_MAPPED_PROPERTIES,
      },
    });

    return response.zone;
  };

  public createZoneForSite = async ({
    siteId,
  }: { siteId: string }): Promise<Zone> => {
    const response = await this.graphqlClient.mutation({
      __name: 'CreateZoneForSite',
      createZoneForSite: {
        __args: {
          where: {
            siteId,
          },
        },
        // TODO: Investigate why the previous fields
        // would now throw> Error: type `Zone` does not have a field `zone`
        // ...DomainsClient.DOMAIN_MAPPED_PROPERTIES,
        __scalar: true,
      },
    });

    return response.createZoneForSite;
  };

  public createZoneForPrivateGateway = async (): Promise<Zone> => {
    const response = await this.graphqlClient.mutation({
      __name: 'CreateZoneForPrivateGateway',
      createZoneForPrivateGateway: DomainsClient.ZONE_MAPPED_PROPERTIES,
    });

    return response.createZoneForPrivateGateway;
  };

  public deleteZone = async ({ id }: { id: string }): Promise<Zone> => {
    const response = await this.graphqlClient.mutation({
      __name: 'DeleteZone',
      deleteZone: {
        __args: {
          where: {
            id,
          },
        },
        ...DomainsClient.ZONE_MAPPED_PROPERTIES,
      },
    });

    return response.deleteZone;
  };

  // ============================================
  // New Custom Domains Methods with SSL Support
  // ============================================

  /**
   * Create a custom domain with verification method selection
   * @param siteId - Site ID to attach domain to
   * @param hostname - Domain hostname (e.g., example.com)
   * @param verificationMethod - TXT, CNAME, or A record verification
   * @param domainType - WEB2, ARNS, ENS, or IPNS
   */
  public createCustomDomain = async ({
    siteId,
    hostname,
    verificationMethod = 'TXT',
    domainType = 'WEB2',
  }: {
    siteId: string;
    hostname: string;
    verificationMethod?: 'TXT' | 'CNAME' | 'A';
    domainType?: 'WEB2' | 'ARNS' | 'ENS' | 'IPNS';
  }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'CreateCustomDomain',
      createDomain: {
        __args: {
          input: {
            siteId,
            hostname,
            verificationMethod,
            domainType,
          },
        },
        __scalar: true,
      },
    });

    return response.createDomain;
  };

  /**
   * Verify domain ownership via DNS
   * @param domainId - Domain ID to verify
   */
  public verifyCustomDomain = async ({ domainId }: { domainId: string }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'VerifyCustomDomain',
      verifyDomain: {
        __args: {
          domainId,
        },
        __scalar: true,
      },
    });

    return response.verifyDomain;
  };

  /**
   * Provision SSL certificate for verified domain
   * @param domainId - Domain ID to provision SSL for
   * @param email - Email for Let's Encrypt notifications
   */
  public provisionSsl = async ({
    domainId,
    email,
  }: {
    domainId: string;
    email: string;
  }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'ProvisionSsl',
      provisionSsl: {
        __args: {
          domainId,
          email,
        },
        __scalar: true,
      },
    });

    return response.provisionSsl;
  };

  /**
   * Set a domain as the primary domain for a site
   * @param siteId - Site ID
   * @param domainId - Domain ID to set as primary
   */
  public setPrimaryDomain = async ({
    siteId,
    domainId,
  }: {
    siteId: string;
    domainId: string;
  }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'SetPrimaryDomain',
      setPrimaryDomain: {
        __args: {
          siteId,
          domainId,
        },
        __scalar: true,
      },
    });

    return response.setPrimaryDomain;
  };

  /**
   * Remove a custom domain
   * @param domainId - Domain ID to remove
   */
  public removeCustomDomain = async ({ domainId }: { domainId: string }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'RemoveCustomDomain',
      removeDomain: {
        __args: {
          domainId,
        },
        __scalar: true,
      },
    });

    return response.removeDomain;
  };

  /**
   * Get verification instructions for a domain
   * @param domainId - Domain ID to get instructions for
   */
  public getVerificationInstructions = async ({
    domainId,
  }: {
    domainId: string;
  }) => {
    const response = await this.graphqlClient.query({
      __name: 'GetVerificationInstructions',
      domainVerificationInstructions: {
        __args: {
          domainId,
        },
        __scalar: true,
      },
    });

    return response.domainVerificationInstructions;
  };

  /**
   * List all domains for a site
   * @param siteId - Site ID to list domains for
   */
  public listDomainsForSite = async ({ siteId }: { siteId: string }) => {
    const response = await this.graphqlClient.query({
      __name: 'ListDomainsForSite',
      site: {
        __args: {
          where: {
            id: siteId,
          },
        },
        domains: {
          __scalar: true,
        },
      },
    });

    return response.site?.domains || [];
  };
}
