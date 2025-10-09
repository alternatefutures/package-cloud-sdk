import {
  Client,
  FleekFunction as OriginalFleekFunction,
  FleekFunctionDeployment,
  FleekFunctionDeploymentGenqlSelection,
  FleekFunctionGenqlSelection,
  FleekFunctionStatus,
} from '@alternatefutures/utils-genql-client';
type FunctionsClientOptions = {
  graphqlClient: Client;
};

export type FleekFunction = Omit<OriginalFleekFunction, 'projectId' | 'site'>;

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
  status?: FleekFunctionStatus;
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

  private static Deployment_MAPPED_PROPERTIES: FleekFunctionDeploymentGenqlSelection = {
    id: true,
    fleekFunctionId: true,
    cid: true,
    updatedAt: true,
    createdAt: true,
  };

  private static FleekFunction_MAPPED_PROPERTIES: FleekFunctionGenqlSelection = {
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
      __name: 'GetFleekFunctionByName',
      fleekFunctionByName: {
        __args: {
          where: {
            name,
          },
        },
        ...FunctionsClient.FleekFunction_MAPPED_PROPERTIES,
      },
    });

    return response.fleekFunctionByName;
  };

  public list = async (): Promise<FleekFunction[]> => {
    const response = await this.graphqlClient.query({
      __name: 'GetFleekFunctions',
      fleekFunctions: {
        __args: {},
        data: {
          ...FunctionsClient.FleekFunction_MAPPED_PROPERTIES,
        },
      },
    });

    return response.fleekFunctions.data;
  };

  public listDeployments = async ({ functionId }: ListFleekFunctionArgs): Promise<FleekFunctionDeployment[]> => {
    const response = await this.graphqlClient.query({
      fleekFunctionDeployments: {
        __args: {
          where: {
            fleekFunctionId: functionId,
          },
        },
        data: {
          ...FunctionsClient.Deployment_MAPPED_PROPERTIES,
        },
      },
    });

    return response.fleekFunctionDeployments.data;
  };

  public create = async ({ name, siteId }: CreateFleekFunctionArgs) => {
    const response = await this.graphqlClient.mutation({
      __name: 'CreateFleekFunction',
      createFleekFunction: {
        __args: {
          data: {
            name,
            siteId,
          },
        },
        ...FunctionsClient.FleekFunction_MAPPED_PROPERTIES,
      },
    });

    return response.createFleekFunction;
  };

  public deploy = async ({ functionId, cid, sgx, blake3Hash, assetsCid }: DeployFleekFunctionArgs): Promise<FleekFunctionDeployment> => {
    const response = await this.graphqlClient.mutation({
      triggerFleekFunctionDeployment: {
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

    return response.triggerFleekFunctionDeployment;
  };

  public delete = async ({ id }: DeleteFleekFunctionArgs) => {
    const response = await this.graphqlClient.mutation({
      __name: 'DeleteFleekFunction',
      deleteFleekFunction: {
        __args: {
          where: {
            id,
          },
        },
        ...FunctionsClient.FleekFunction_MAPPED_PROPERTIES,
      },
    });

    return response.deleteFleekFunction;
  };

  public update = async ({ id, slug, name, status }: UpdateFleekFunctionArgs) => {
    const response = await this.graphqlClient.mutation({
      updateFleekFunction: {
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

    return response.updateFleekFunction;
  };
}
