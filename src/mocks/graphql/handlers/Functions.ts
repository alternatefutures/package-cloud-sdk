import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse, http } from 'msw';

import { localhost, mockGraphqlServiceApiUrl } from '@mocks/graphql/config';
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
          name: variables.v1?.name || 'new-function',
          projectId: 'clgkiwjd8000c08mefyco2eoo',
          slug: 'crooked-bland-jackal',
          status: 'ACTIVE',
          routes: variables.v1?.routes || null,
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
  // Fallback handler for multipart form-data GraphQL requests (used by update mutations)
  http.post(mockGraphqlServiceApiUrl, async ({ request }) => {
    const contentType = request.headers.get('content-type');

    if (!contentType?.includes('multipart/form-data')) {
      return;
    }

    try {
      const formData = await request.formData();
      const operations = formData.get('operations');

      if (typeof operations !== 'string') {
        return;
      }

      const parsed = JSON.parse(operations);
      const query = parsed.query || '';
      const variables = parsed.variables || {};

      // Handle CreateAFFunction mutation
      if (query.includes('createAFFunction')) {
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
              name: variables.v1?.name || 'new-function',
              projectId: 'clgkiwjd8000c08mefyco2eoo',
              slug: 'crooked-bland-jackal',
              status: 'ACTIVE',
              routes: variables.v1?.routes || null,
            },
          },
        });

        return HttpResponse.json({
          data: res.data,
          errors: res.errors,
        });
      }

      // Handle UpdateAFFunction mutation
      if (query.includes('updateAFFunction')) {
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
              routes: variables.v2?.routes !== undefined ? variables.v2.routes : null,
            },
          },
        });

        return HttpResponse.json({
          data: res.data,
          errors: res.errors,
        });
      }

      // Handle UpdateProject mutation
      if (query.includes('updateProject')) {
        // Check if there's an avatar file in the form data
        const hasAvatarFile = formData.has('map') && formData.get('map')?.toString().includes('avatar');

        const res = await executeGraphql({
          schema,
          source: query,
          variableValues: variables,
          rootValue: {
            updateProject: {
              avatar: hasAvatarFile ? 'https://secret-asset-url/cid?token=eyJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJRbVNOWHVIckpIUW03QTNlbjh5YjR6ZHZwWGdDYzFVRVc3Z1JVSFM5dmRnWEYxIiwiZXhwIjoxNzI3Nzk3OTA3fQ.UBUUQ2sk0-b60SbyoAKOXsFSgOJ_uJh_IA85-V9JU2E' : null,
              backupStorageOnArweave: variables.v2?.backupStorageOnArweave ?? false,
              backupStorageOnFilecoin: variables.v2?.backupStorageOnFilecoin ?? false,
              createdAt: '2023-03-23T08:05:13.641Z',
              id: variables.v1?.id || 'clgkiwjd8000c08mefyco2eoo',
              name: variables.v2?.name || 'electronicCo',
            },
          },
        });

        return HttpResponse.json({
          data: res.data,
          errors: res.errors,
        });
      }

      // Handle ResolveIpnsName query
      if (query.includes('resolveIpnsName')) {
        const res = await executeGraphql({
          schema,
          source: query,
          variableValues: variables,
          rootValue: {
            resolveIpnsName: '/ipfs/QmRG4xcsmoZuXqKuPz3uVBgvo3GZ6k1kLZWhmvzuKtDr9s',
          },
        });

        return HttpResponse.json({
          data: res.data,
          errors: res.errors,
        });
      }
    } catch (error) {
      console.error('Error handling multipart GraphQL request:', error);
    }

    return;
  }),
];

export const handlers = [...queries, ...mutations];
