import {
  Client,
  AFFunction as OriginalAFFunction,
  AFFunctionDeployment,
  AFFunctionDeploymentGenqlSelection,
  AFFunctionGenqlSelection,
  AFFunctionStatus,
} from '@alternatefutures/utils-genql-client';
type FunctionsClientOptions = {
  graphqlClient: Client;
};

export type FleekFunction = Omit<OriginalAFFunction, 'projectId' | 'site'>;

export type GetFleekFunctionArgs = {
  name: string;
};
export type CreateFleekFunctionArgs = {
  name: string;
  siteId?: string;
};
export type DeleteFleekFunctionArgs = {
  id: string;
};
export type UpdateFleekFunctionArgs = {
  id: string;
  name?: string;
  slug?: string;
  status?: AFFunctionStatus;
};
export type DeployFleekFunctionArgs = {
  functionId: string;
  cid: string;
  sgx?: boolean;
  blake3Hash?: string;
  assetsCid?: string;
};
export type ListFleekFunctionArgs = {
  functionId: string;
};

export class FunctionsClient {
  private graphqlClient: Client;

  private static Deployment_MAPPED_PROPERTIES: AFFunctionDeploymentGenqlSelection = {
    id: true,
    afFunctionId: true,
    cid: true,
    updatedAt: true,
    createdAt: true,
  };

  private static FleekFunction_MAPPED_PROPERTIES: AFFunctionGenqlSelection = {
    id: true,
    name: true,
    slug: true,
    invokeUrl: true,
    projectId: true,
    currentDeploymentId: true,
    currentDeployment: {
      cid: true,
    },
    siteId: true,
    status: true,
  };

  constructor(options: FunctionsClientOptions) {
    this.graphqlClient = options.graphqlClient;
  }

  public get = async ({ name }: GetFleekFunctionArgs): Promise<FleekFunction> => {
    const response = await this.graphqlClient.query({
      __name: 'GetAFFunctionByName',
      afFunctionByName: {
        __args: {
          where: {
            name,
          },
        },
        ...FunctionsClient.FleekFunction_MAPPED_PROPERTIES,
      },
    });

    return response.afFunctionByName;
  };

  public list = async (): Promise<FleekFunction[]> => {
    const response = await this.graphqlClient.query({
      __name: 'GetAFFunctions',
      afFunctions: {
        __args: {},
        data: {
          ...FunctionsClient.FleekFunction_MAPPED_PROPERTIES,
        },
      },
    });

    return response.afFunctions.data;
  };

  public listDeployments = async ({ functionId }: ListFleekFunctionArgs): Promise<AFFunctionDeployment[]> => {
    const response = await this.graphqlClient.query({
      afFunctionDeployments: {
        __args: {
          where: {
            afFunctionId: functionId,
          },
        },
        data: {
          ...FunctionsClient.Deployment_MAPPED_PROPERTIES,
        },
      },
    });

    return response.afFunctionDeployments.data;
  };

  public create = async ({ name, siteId }: CreateFleekFunctionArgs) => {
    const response = await this.graphqlClient.mutation({
      __name: 'CreateAFFunction',
      createAFFunction: {
        __args: {
          data: {
            name,
            siteId,
          },
        },
        ...FunctionsClient.FleekFunction_MAPPED_PROPERTIES,
      },
    });

    return response.createAFFunction;
  };

  public deploy = async ({ functionId, cid, sgx, blake3Hash, assetsCid }: DeployFleekFunctionArgs): Promise<AFFunctionDeployment> => {
    const response = await this.graphqlClient.mutation({
      triggerAFFunctionDeployment: {
        __args: {
          where: {
            functionId,
            cid,
          },
          data: { sgx, blake3Hash, assetsCid },
        },
        ...FunctionsClient.Deployment_MAPPED_PROPERTIES,
      },
    });

    return response.triggerAFFunctionDeployment;
  };

  public delete = async ({ id }: DeleteFleekFunctionArgs) => {
    const response = await this.graphqlClient.mutation({
      __name: 'DeleteAFFunction',
      deleteAFFunction: {
        __args: {
          where: {
            id,
          },
        },
        ...FunctionsClient.FleekFunction_MAPPED_PROPERTIES,
      },
    });

    return response.deleteAFFunction;
  };

  public update = async ({ id, slug, name, status }: UpdateFleekFunctionArgs) => {
    const response = await this.graphqlClient.mutation({
      updateAFFunction: {
        __args: {
          where: {
            id,
          },
          data: {
            slug,
            name,
            status,
          },
        },
        ...FunctionsClient.FleekFunction_MAPPED_PROPERTIES,
      },
    });

    return response.updateAFFunction;
  };
}
