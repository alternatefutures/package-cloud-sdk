import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const queries = [
  localhost.query('GetAFFunctionByName', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        afFunctionByName: {
          currentDeployment: {
            cid: 'bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q',
          },
          currentDeploymentId: 'clgmajsoo000108moef7f1yt0',
          id: 'clgma7ilu000008jzdlwhb76a',
          invokeUrl: 'blue-green-yellow.functions.af-cloud.app',
          name: 'electronic-co-shop',
          projectId: 'clgkiwjd8000c08mefyco2eoo',
          slug: 'blue-green-yellow',
          status: 'ACTIVE',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.query('GetAFFunctions', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        afFunctions: {
          currentPage: 1,
          pageCount: 1,
          totalCount: 5,
          isFirstPage: true,
          isLastPage: true,
          nextPage: null,
          previousPage: null,
          data: [
            {
              currentDeployment: {
                cid: 'bafybeifcesfwifuhcshuobdgw6kod4jzinu4u4v2lzjzdmps3ndaydrsri',
              },
              currentDeploymentId: 'clmz7kxj60003mk08eg5wmtqh',
              id: 'clmkp5nn50000mm08yq7hierx',
              invokeUrl: 'red-green-blue.functions.af-cloud.app',
              name: 'electronicCoLanding',
              projectId: 'clgkiwjd8000c08mefyco2eoo',
              slug: 'red-green-blue',
              status: 'ACTIVE',
            },
            {
              currentDeployment: null,
              currentDeploymentId: null,
              id: 'clgma7mmh000108jzd13c50ol',
              invokeUrl: 'white-black-silver.functions.af-cloud.app',
              name: 'electronic-co-blog',
              projectId: 'clgkiwjd8000c08mefyco2eoo',
              slug: 'white-black-silver',
              status: 'ACTIVE',
            },
            {
              currentDeployment: null,
              currentDeploymentId: null,
              id: 'clje32iwx000008js9rjb5uoo',
              invokeUrl: 'green-gold-silver.functions.af-cloud.app',
              name: 'electronic-co-videos',
              projectId: 'clgkiwjd8000c08mefyco2eoo',
              slug: 'green-gold-silver',
              status: 'ACTIVE',
            },
            {
              currentDeployment: {
                cid: 'bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q',
              },
              currentDeploymentId: 'clgmajsoo000108moef7f1yt0',
              id: 'clgma7ilu000008jzdlwhb76a',
              invokeUrl: 'blue-green-yellow.functions.af-cloud.app',
              name: 'electronic-co-shop',
              projectId: 'clgkiwjd8000c08mefyco2eoo',
              slug: 'blue-green-yellow',
              status: 'ACTIVE',
            },
            {
              currentDeployment: null,
              currentDeploymentId: null,
              id: 'clm93utuz000108laem2a4pe4',
              invokeUrl: 'blue-gold-yellow.functions.af-cloud.app',
              name: 'electronic-co-deprecated',
              projectId: 'clgkiwjd8000c08mefyco2eoo',
              slug: 'blue-gold-yellow',
              status: 'ACTIVE',
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
  localhost.mutation('CreateAFFunction', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        createAFFunction: {
          currentDeployment: null,
          currentDeploymentId: null,
          id: 'clgmg76ch000208mid5o30du0',
          invokeUrl: 'https://crooked-bland-jackal.dev.on-af-functions.app',
          name: 'new-function',
          projectId: 'clgkiwjd8000c08mefyco2eoo',
          slug: 'crooked-bland-jackal',
          status: 'ACTIVE',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation('DeleteAFFunction', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        deleteAFFunction: {
          currentDeployment: null,
          currentDeploymentId: null,
          id: 'clje32iwx000008js9rjb5uoo',
          invokeUrl: 'green-gold-silver.functions.af-cloud.app',
          name: 'electronic-co-videos',
          projectId: 'clgkiwjd8000c08mefyco2eoo',
          slug: 'green-gold-silver',
          status: 'ACTIVE',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation('UpdateAFFunction', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        updateAFFunction: {
          currentDeployment: {
            cid: 'bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q',
          },
          currentDeploymentId: 'clgmajsoo000108moef7f1yt0',
          id: 'clgma7ilu000008jzdlwhb76a',
          invokeUrl: 'blue-green-yellow.functions.af-cloud.app',
          name: 'electronic-co-shop',
          projectId: 'clgkiwjd8000c08mefyco2eoo',
          slug: 'blue-green-yellow',
          status: 'ACTIVE',
          routes: variables.data?.routes || null,
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
