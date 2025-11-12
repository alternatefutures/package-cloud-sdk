import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const queries = [
  localhost.query('GetApplication', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        application: {
          clientId: 'client_SCmayempJ1d953yjn1yx',
          createdAt: '2023-03-23T12:05:13.641Z',
          id: 'cli2ymypd000208l86gjd6p17',
          name: 'electronicCoMobileApp',
          updatedAt: '2023-03-23T12:05:13.641Z',
          whiteLabelDomains: [
            {
              hostname: 'app.best-electronic.co',
              id: 'clu2xf6uz000208jv6qskg1hm',
            },
            {
              hostname: 'app.electronic.co',
              id: 'clu2xd1bs000108jv0v0d2xmy',
            },
          ],
          whitelistDomains: [
            {
              hostname: 'app.best-electronic.co',
              id: 'cli2z1zim000008l66z4l7qg3',
            },
            {
              hostname: 'app.electronic.co',
              id: 'cli2z10wq000208jw42gd4pyh',
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
  localhost.query('GetApplications', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        applications: {
          data: [
            {
              clientId: 'client_ZRacrn3b1ForrjK5u8VD',
              createdAt: '2023-03-23T11:05:13.641Z',
              id: 'cli2ymucu000108l81grqhzcp',
              name: 'electronicCoWebApp',
              updatedAt: '2023-03-23T11:05:13.641Z',
              whiteLabelDomains: [],
              whitelistDomains: [],
            },
            {
              clientId: 'client_SCmayempJ1d953yjn1yx',
              createdAt: '2023-03-23T12:05:13.641Z',
              id: 'cli2ymypd000208l86gjd6p17',
              name: 'electronicCoMobileApp',
              updatedAt: '2023-03-23T12:05:13.641Z',
              whiteLabelDomains: [
                {
                  hostname: 'app.best-electronic.co',
                  id: 'clu2xf6uz000208jv6qskg1hm',
                },
                {
                  hostname: 'app.electronic.co',
                  id: 'clu2xd1bs000108jv0v0d2xmy',
                },
              ],
              whitelistDomains: [
                {
                  hostname: 'app.best-electronic.co',
                  id: 'cli2z1zim000008l66z4l7qg3',
                },
                {
                  hostname: 'app.electronic.co',
                  id: 'cli2z10wq000208jw42gd4pyh',
                },
              ],
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
  // TODO: This mandates returning whitelistDomains
  // and whiteLabelDomains, while the non-schema version
  // does not requires it for some reason.
  // Do a test in runtime to check
  localhost.mutation('CreateApplication', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        createApplication: {
          __typename: 'Application',
          clientId: 'client_testtesttest',
          createdAt: '2023-03-23T12:05:13.641Z',
          id: '',
          name: 'test-application',
          updatedAt: '2023-03-23T12:05:13.641Z',
          whitelistDomains: [],
          whiteLabelDomains: [],
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation('UpdateApplication', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        updateApplication: {
          clientId: 'client_SCmayempJ1d953yjn1yx',
          createdAt: '2023-03-23T12:05:13.641Z',
          id: 'cli2ymypd000208l86gjd6p17',
          name: 'new-mobile-app-name',
          updatedAt: '2023-03-23T12:05:13.641Z',
          whiteLabelDomains: [
            {
              hostname: 'app.best-electronic.co',
              id: 'clu2xf6uz000208jv6qskg1hm',
            },
            {
              hostname: 'app.electronic.co',
              id: 'clu2xd1bs000108jv0v0d2xmy',
            },
          ],
          whitelistDomains: [
            {
              hostname: 'app.best-electronic.co',
              id: 'cli2z1zim000008l66z4l7qg3',
            },
            {
              hostname: 'app.electronic.co',
              id: 'cli2z10wq000208jw42gd4pyh',
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
  localhost.mutation('DeleteApplication', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        deleteApplication: {
          clientId: 'client_SCmayempJ1d953yjn1yx',
          createdAt: '2023-03-23T12:05:13.641Z',
          id: 'cli2ymypd000208l86gjd6p17',
          name: 'electronicCoMobileApp',
          updatedAt: '2023-03-23T12:05:13.641Z',
          whiteLabelDomains: [
            {
              hostname: 'app.best-electronic.co',
              id: 'clu2xf6uz000208jv6qskg1hm',
            },
            {
              hostname: 'app.electronic.co',
              id: 'clu2xd1bs000108jv0v0d2xmy',
            },
          ],
          whitelistDomains: [
            {
              hostname: 'app.best-electronic.co',
              id: 'cli2z1zim000008l66z4l7qg3',
            },
            {
              hostname: 'app.electronic.co',
              id: 'cli2z10wq000208jw42gd4pyh',
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

export const handlers = [...queries, ...mutations];
