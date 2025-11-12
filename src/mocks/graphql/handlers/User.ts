import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const queries = [
  localhost.query('GetPersonalAccessTokens', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        personalAccessTokens: {
          data: [
            {
              createdAt: '2023-03-21T08:05:13.641Z',
              id: 'clgkiwxl9000e08meh1z64f5l',
              maskedToken: 'pat_*******SuB',
              name: 'mobile',
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
  localhost.mutation(
    'DeletePersonalAccessToken',
    async ({ query, variables }) => {
      const res = await executeGraphql({
        schema,
        source: query,
        variableValues: variables,
        rootValue: {
          deletePersonalAccessToken: {
            __typename: 'PersonalAccessToken',
            createdAt: '2023-03-21T08:05:13.641Z',
            id: 'clgkiwxl9000e08meh1z64f5l',
            maskedToken: 'pat_*******SuB',
            name: 'mobile',
            updatedAt: '2023-03-21T08:05:13.641Z',
          },
        },
      });

      return HttpResponse.json({
        data: res.data,
        errors: res.errors,
      });
    },
  ),
];

export const handlers = [...queries, ...mutations];
