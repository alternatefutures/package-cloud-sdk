import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const queries = [
  localhost.query('GetPrivateGateway', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        privateGateway: {
          __typename: 'PrivateGateway',
          createdAt: '2023-03-24T09:05:13.641Z',
          id: 'clhruz26u000108mbdb2zaft0',
          name: 'electronic.co eshop',
          primaryDomain: {
            __typename: 'Domain',
            id: 'clmhwwted000108mnajduel68',
          },
          project: {
            __typename: 'Project',
            id: 'clgkiwjd8000c08mefyco2eoo',
          },
          slug: 'blue-fox-two',
          updatedAt: '2023-04-24T09:05:13.641Z',
          zone: {
            __typename: 'Zone',
            id: 'cljfq6n2y000008lb4oy403bc',
          },
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.query('GetPrivateGatewayBySlug', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        privateGatewayBySlug: {
          __typename: 'PrivateGateway',
          createdAt: '2023-03-24T09:05:13.641Z',
          id: 'clhruz26u000108mbdb2zaft0',
          name: 'electronic.co eshop',
          primaryDomain: {
            __typename: 'Domain',
            id: 'clmhwwted000108mnajduel68',
          },
          project: {
            __typename: 'Project',
            id: 'clgkiwjd8000c08mefyco2eoo',
          },
          slug: 'blue-fox-two',
          updatedAt: '2023-04-24T09:05:13.641Z',
          zone: {
            __typename: 'Zone',
            id: 'cljfq6n2y000008lb4oy403bc',
          },
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.query('GetPrivateGateways', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        privateGateways: {
          data: [
            {
              __typename: 'PrivateGateway',
              createdAt: '2023-03-24T09:05:13.641Z',
              id: 'clhruz26u000108mbdb2zaft0',
              name: 'electronic.co eshop',
              primaryDomain: {
                __typename: 'Domain',
                id: 'clmhwwted000108mnajduel68',
              },
              project: {
                __typename: 'Project',
                id: 'clgkiwjd8000c08mefyco2eoo',
              },
              slug: 'blue-fox-two',
              updatedAt: '2023-04-24T09:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'cljfq6n2y000008lb4oy403bc',
              },
            },
            {
              __typename: 'PrivateGateway',
              createdAt: '2023-04-25T09:05:13.641Z',
              id: 'clj76l893000108l2dsuegrz9',
              name: 'electronic.co photos',
              primaryDomain: {
                __typename: 'Domain',
                id: 'clmhwwted000108mnajduel68',
              },
              project: {
                __typename: 'Project',
                id: 'clgkiwjd8000c08mefyco2eoo',
              },
              slug: 'fish-blue-one',
              updatedAt: '2023-04-25T11:05:13.641Z',
              zone: {
                __typename: 'Zone',
                id: 'clj76kw6i000008l2ekmz6ahd',
              },
            },
            {
              __typename: 'PrivateGateway',
              createdAt: '2023-03-24T09:05:13.641Z',
              id: 'clu6w5g44000108labn6eai20',
              name: 'electronic.co documents',
              primaryDomain: {
                __typename: 'Domain',
                id: 'clmhwwted000108mnajduel68',
              },
              project: {
                __typename: 'Project',
                id: 'clgkiwjd8000c08mefyco2eoo',
              },
              slug: 'blue-dog-seven',
              updatedAt: '2023-04-24T09:05:13.641Z',
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
];

const mutations = [
  localhost.mutation('CreatePrivateGateway', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        createPrivateGateway: {
          __typename: 'PrivateGateway',
          createdAt: '2023-03-23T09:05:13.641Z',

          id: 'clgmfj874000208lc2e9ccglf',

          name: 'new-gateway',
          primaryDomain: {
            __typename: 'Domain',
            id: 'clmhwwted000108mnajduel68',
          },
          project: {
            __typename: 'Project',
            id: 'clgkiwjd8000c08mefyco2eoo',
          },
          slug: '',
          updatedAt: '2023-03-23T09:05:13.641Z',
          zone: {
            __typename: 'Zone',
            id: 'clu71yju0000008ji67mzdyzb',
          },
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation('DeletePrivateGateway', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        deletePrivateGateway: {
          __typename: 'PrivateGateway',
          createdAt: '2023-04-25T09:05:13.641Z',
          id: 'clj76l893000108l2dsuegrz9',
          name: 'electronic.co photos',
          slug: 'fish-blue-one',
          updatedAt: '2023-03-23T09:05:13.641Z',
          // TODO: check expected ds
          project: {
            id: '',
          },
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation('UpdatePrivateGateway', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        updatePrivateGateway: {
          __typename: 'PrivateGateway',
          createdAt: '2023-03-24T09:05:13.641Z',
          id: 'clhruz26u000108mbdb2zaft0',
          name: 'new electronic.co eshop',
          primaryDomain: {
            __typename: 'Domain',
            id: 'clmhwwted000108mnajduel68',
          },
          project: {
            __typename: 'Project',
            id: 'clgkiwjd8000c08mefyco2eoo',
          },
          slug: 'blue-fox-two',
          updatedAt: '2023-03-24T09:05:13.641Z',
          zone: {
            __typename: 'Zone',
            id: 'cljfq6n2y000008lb4oy403bc',
          },
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
