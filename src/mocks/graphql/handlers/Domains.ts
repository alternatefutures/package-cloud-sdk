import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const queries = [
  localhost.query('GetDomains', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        domains: {
          data: [
            {
              __typename: 'Domain',
              createdAt: '2023-03-24T09:05:13.641Z',
              dnsConfigs: [
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-03-23T09:05:13.641Z',
                  id: 'clgmg76ch000208mid5o30du0',
                  name: 'hostname',
                  type: 'CNAME',
                  updatedAt: '2023-03-23T09:05:13.641Z',
                  value: 'clgmfj874000208lc2e9ccglf.b-cdn.net',
                },
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-03-23T10:05:13.641Z',
                  id: 'clgmgbj4h000308mi8aai0pli',
                  name: 'hostname',
                  type: 'CNAME',
                  updatedAt: '2023-03-23T10:05:13.641Z',
                  value: 'clgmfj874000208lc2e9ccglf.b-cdn.net',
                },
              ],
              hostname: 'electronic.co',
              id: 'clgmfj1pa000108lc0g5i7d32',
              isVerified: true,
              status: 'ACTIVE',
              updatedAt: '2023-03-24T09:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'clgmfj874000208lc2e9ccglf',
              },
            },
            {
              __typename: 'Domain',
              createdAt: '2023-03-24T10:05:13.641Z',
              dnsConfigs: [],
              hostname: 'eshop-electronic.co',
              id: 'clgmfj874000208lc2e9ccglf',
              isVerified: false,
              status: 'VERIFYING_FAILED',
              updatedAt: '2023-03-24T10:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'clgmfj874000208lc2e9ccglf',
              },
            },
            {
              __typename: 'Domain',
              createdAt: '2023-03-28T10:05:13.641Z',
              dnsConfigs: [
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-02-28T10:04:33.641Z',
                  id: 'cln2226gc000208la1egftrd4',
                  name: '_dnslink',
                  type: 'CNAME',
                  updatedAt: '2023-02-28T10:04:33.641Z',
                  value: 'blue-green-yellow.dev.on-af-test.app',
                },
              ],
              hostname: 'blog-electornic.co',
              id: 'clgnslqvg000108l6hg5ea3u0',
              isVerified: false,
              status: 'CREATING',
              updatedAt: '2023-03-28T10:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'clgow7wob000508jog5gfanj9',
              },
            },
            {
              __typename: 'Domain',
              createdAt: '2023-03-28T10:05:13.641Z',
              dnsConfigs: [
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-02-28T10:04:33.641Z',
                  id: 'ckmhgsu0x011008mney5h0bu',
                  name: '_dnslink',
                  type: 'CNAME',
                  updatedAt: '2023-02-28T10:04:33.641Z',
                  value: '_dnslink.white-black-silver.dev.on-af-test.app',
                },
              ],
              hostname: 'dnslink-electornic.co',
              id: 'clgnslqvg000108l6hg5ea3u1',
              isVerified: true,
              status: 'ACTIVE',
              updatedAt: '2023-03-28T10:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'clgow7wob000508jog5gfanj9',
              },
            },
            {
              __typename: 'Domain',
              createdAt: '2023-03-24T10:05:13.641Z',
              dnsConfigs: [
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-02-28T10:04:33.641Z',
                  id: 'ckmhgsu0x011008mney3h03bu',
                  name: '_dnslink',
                  type: 'CNAME',
                  updatedAt: '2023-02-28T10:04:33.641Z',
                  value: 'one-knife-yellow.dev.on-af-test.app',
                },
              ],
              hostname: 'static.eshop-electronic.co',
              id: 'clmhwwted000108mnajduel68',
              isVerified: true,
              status: 'ACTIVE',
              updatedAt: '2023-03-24T10:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'cljfq6n2y000008lb4oy403bc',
              },
            },
            {
              __typename: 'Domain',
              createdAt: '2023-02-28T10:05:13.641Z',
              dnsConfigs: [
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-02-28T10:04:33.641Z',
                  id: 'cln2226gc000208la1egogfn3',
                  name: 'hostname',
                  type: 'CNAME',
                  updatedAt: '2023-02-28T10:04:33.641Z',
                  value: 'cljfqzrcg000208jy6677aqv1.afcdn.xyz',
                },
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-02-28T10:04:33.641Z',
                  id: 'cln2226gc000208laurhtg4d5',
                  name: '_dnslink',
                  type: 'CNAME',
                  updatedAt: '2023-02-28T10:04:33.641Z',
                  value: 'blue-green-yellow.dev.on-af-test.app',
                },
              ],
              hostname: 'documents-electronic.co',
              id: 'cln21wwwa000008la7e0kbvd7',
              isVerified: false,
              status: 'CREATED',
              updatedAt: '2023-02-28T10:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'cljfqzrcg000208jy6677aqv1',
              },
            },
          ],
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.query('GetDomainById', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        domain: {
          __typename: 'Domain',
          createdAt: '2023-03-24T09:05:13.641Z',
          dnsConfigs: [
            {
              __typename: 'DnsConfig',
              createdAt: '2023-03-23T09:05:13.641Z',
              id: 'clgmg76ch000208mid5o30du0',
              name: 'hostname',
              type: 'CNAME',
              updatedAt: '2023-03-23T09:05:13.641Z',
              value: 'clgmfj874000208lc2e9ccglf.b-cdn.net',
            },
            {
              __typename: 'DnsConfig',
              createdAt: '2023-03-23T10:05:13.641Z',
              id: 'clgmgbj4h000308mi8aai0pli',
              name: 'hostname',
              type: 'CNAME',
              updatedAt: '2023-03-23T10:05:13.641Z',
              value: 'clgmfj874000208lc2e9ccglf.b-cdn.net',
            },
          ],
          hostname: 'electronic.co',
          id: 'clgmfj1pa000108lc0g5i7d32',
          isVerified: true,
          status: 'ACTIVE',
          updatedAt: '2023-03-24T09:05:13.641Z',
          zone: {
            __typename: 'Zone',
            id: 'clgmfj874000208lc2e9ccglf',
          },
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.query('GetDomainByHostname', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        domainByHostname: {
          __typename: 'Domain',
          createdAt: '2023-03-24T09:05:13.641Z',
          dnsConfigs: [
            {
              __typename: 'DnsConfig',
              createdAt: '2023-03-23T09:05:13.641Z',
              id: 'clgmg76ch000208mid5o30du0',
              name: 'hostname',
              type: 'CNAME',
              updatedAt: '2023-03-23T09:05:13.641Z',
              value: 'clgmfj874000208lc2e9ccglf.b-cdn.net',
            },
            {
              __typename: 'DnsConfig',
              createdAt: '2023-03-23T10:05:13.641Z',
              id: 'clgmgbj4h000308mi8aai0pli',
              name: 'hostname',
              type: 'CNAME',
              updatedAt: '2023-03-23T10:05:13.641Z',
              value: 'clgmfj874000208lc2e9ccglf.b-cdn.net',
            },
          ],
          hostname: 'electronic.co',
          id: 'clgmfj1pa000108lc0g5i7d32',
          isVerified: true,
          status: 'ACTIVE',
          updatedAt: '2023-03-24T09:05:13.641Z',
          zone: {
            __typename: 'Zone',
            id: 'clgmfj874000208lc2e9ccglf',
          },
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.query('GetDomainsByZoneId', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        domainsByZoneId: {
          data: [
            {
              __typename: 'Domain',
              createdAt: '2023-03-24T09:05:13.641Z',
              dnsConfigs: [
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-03-23T09:05:13.641Z',
                  id: 'clgmg76ch000208mid5o30du0',
                  name: 'hostname',
                  type: 'CNAME',
                  updatedAt: '2023-03-23T09:05:13.641Z',
                  value: 'clgmfj874000208lc2e9ccglf.b-cdn.net',
                },
                {
                  __typename: 'DnsConfig',
                  createdAt: '2023-03-23T10:05:13.641Z',
                  id: 'clgmgbj4h000308mi8aai0pli',
                  name: 'hostname',
                  type: 'CNAME',
                  updatedAt: '2023-03-23T10:05:13.641Z',
                  value: 'clgmfj874000208lc2e9ccglf.b-cdn.net',
                },
              ],
              hostname: 'electronic.co',
              id: 'clgmfj1pa000108lc0g5i7d32',
              isVerified: true,
              status: 'ACTIVE',
              updatedAt: '2023-03-24T09:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'clgmfj874000208lc2e9ccglf',
              },
            },
            {
              __typename: 'Domain',
              createdAt: '2023-03-24T10:05:13.641Z',
              dnsConfigs: [],
              hostname: 'eshop-electronic.co',
              id: 'clgmfj874000208lc2e9ccglf',
              isVerified: false,
              status: 'VERIFYING_FAILED',
              updatedAt: '2023-03-24T10:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'clgmfj874000208lc2e9ccglf',
              },
            },
          ],
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.query('ListZones', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        zones: {
          data: [
            {
              __typename: 'Zone',
              createdAt: '2022-12-24T09:04:13.641Z',
              id: 'clgmfj874000208lc2e9ccglf',
              originUrl:
                'https://ipfs.io/ipfs/QmXYsy8xLYRaDbgDNeSthWSNneKM13Vb1FHV8LC4DghHy2',
              status: 'CREATED',
              type: 'SITE',
              updatedAt: '2022-12-24T09:04:13.641Z',
            },
            {
              __typename: 'Zone',
              createdAt: '2022-12-28T10:04:13.641Z',
              id: 'clgow7wob000508jog5gfanj9',
              originUrl:
                'https://bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q.ipfs.gateway-ipfs.afsandbox.xyz',
              status: 'CREATED',
              type: 'SITE',
              updatedAt: '2022-12-28T10:04:13.641Z',
            },
            {
              __typename: 'Zone',
              createdAt: '2022-04-25T09:04:13.641Z',
              id: 'clj76kw6i000008l2ekmz6ahd',
              originUrl:
                'https://bafybeib5qbrx6xdrdvuxt2wsvfsrwwvu42bfh6pycm677qjkl66heelc2e.ipfs.gateway-ipfs.afsandbox.xyz',
              status: 'CREATED',
              type: 'PRIVATE_GATEWAY',
              updatedAt: '2022-04-25T10:04:13.641Z',
            },
            {
              __typename: 'Zone',
              createdAt: '2022-12-30T11:04:13.641Z',
              id: 'clje357cc000108jse08c2t6m',
              originUrl:
                'https://ipfs.io/ipfs/QmdG8HaQAYccz22zLgJ33trzu8g6wjF6e48YbBEZhbz342',
              status: 'CREATING_FAILED',
              type: 'SITE',
              updatedAt: '2022-12-30T11:04:13.641Z',
            },
            {
              __typename: 'Zone',
              createdAt: '2022-12-24T09:04:13.641Z',
              id: 'cljfq6n2y000008lb4oy403bc',
              originUrl: 'https://dedicated-gateway-ipfs.afsandbox.xyz',
              status: 'CREATED',
              type: 'PRIVATE_GATEWAY',
              updatedAt: '2022-12-24T09:04:13.641Z',
            },
            {
              __typename: 'Zone',
              createdAt: '2023-02-28T10:04:13.641Z',
              id: 'cljfqzrcg000208jy6677aqv1',
              originUrl: 'https://dedicated-gateway-ipfs.afsandbox.xyz',
              status: 'CREATED',
              type: 'PRIVATE_GATEWAY',
              updatedAt: '2023-02-28T10:04:13.641Z',
            },
          ],
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.query('GetZone', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        zone: {
          __typename: 'Zone',
          createdAt: '2022-12-24T09:04:13.641Z',
          id: 'clgmfj874000208lc2e9ccglf',
          originUrl:
            'https://ipfs.io/ipfs/QmXYsy8xLYRaDbgDNeSthWSNneKM13Vb1FHV8LC4DghHy2',
          status: 'CREATED',
          type: 'SITE',
          updatedAt: '2022-12-24T09:04:13.641Z',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
];

const mutations = [
  localhost.mutation('CreateDomain', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        createDomain: {
          __typename: 'Domain',
          createdAt: '2023-03-23T12:05:13.641Z',
          dnslinkStatus: null,
          errorMessage: null,
          hostname: 'super-eshop.xyz',
          id: 'cli2ymypd000208l86gjd6p17',
          isVerified: false,
          status: 'CREATING',
          updatedAt: '2023-03-23T12:05:13.641Z',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation('DeleteDomain', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        deleteDomain: {
          __typename: 'Domain',
          createdAt: '2023-03-24T10:05:13.641Z',
          dnsConfigs: [],
          hostname: 'eshop-electronic.co',
          id: 'clgmfj874000208lc2e9ccglf',
          isVerified: false,
          status: 'DELETING',
          updatedAt: '2023-03-23T12:05:13.641Z',
          zone: {
            __typename: 'Zone',
            id: 'clgmfj874000208lc2e9ccglf',
          },
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation('VerifyDomain', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        verifyDomain: {
          __typename: 'Domain',
          createdAt: '2023-03-24T10:05:13.641Z',
          dnsConfigs: [],
          hostname: 'eshop-electronic.co',
          id: 'clgmfj874000208lc2e9ccglf',
          isVerified: false,
          status: 'VERIFYING',
          updatedAt: '2023-03-23T12:05:13.641Z',
          zone: {
            __typename: 'Zone',
            id: 'clgmfj874000208lc2e9ccglf',
          },
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation('CreateZoneForSite', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        createZoneForSite: {
          __typename: 'Zone',
          createdAt: '2023-03-23T12:05:13.641Z',
          id: 'clgmg76ch000208mid5o30du0',
          originUrl:
            'https://bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva.ipfs.gateway-ipfs.afsandbox.xyz',
          originUrlChangedAt: null,
          status: 'CREATING',
          type: 'SITE',
          updatedAt: '2023-03-23T12:05:13.641Z',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation(
    'CreateZoneForPrivateGateway',
    async ({ query, variables }) => {
      const res = await executeGraphql({
        schema,
        source: query,
        variableValues: variables,
        rootValue: {
          createZoneForPrivateGateway: {
            __typename: 'Zone',
            createdAt: '2023-03-23T12:05:13.641Z',

            id: 'clgmg76ch000208mid5o30du0',
            originUrl: 'https://storage.dev.on-af-test.app',
            status: 'CREATING',
            type: 'PRIVATE_GATEWAY',
            updatedAt: '2023-03-23T12:05:13.641Z',
          },
        },
      });

      return HttpResponse.json({
        data: res.data,
        errors: res.errors,
      });
    },
  ),
  localhost.mutation('DeleteZone', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        deleteZone: {
          __typename: 'Zone',
          createdAt: '2022-12-30T11:04:13.641Z',
          id: 'clje357cc000108jse08c2t6m',
          originUrl:
            'https://ipfs.io/ipfs/QmdG8HaQAYccz22zLgJ33trzu8g6wjF6e48YbBEZhbz342',
          status: 'DELETING',
          type: 'SITE',
          updatedAt: '2023-03-23T12:05:13.641Z',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
];

export const handlers = [...queries, ...mutations];
