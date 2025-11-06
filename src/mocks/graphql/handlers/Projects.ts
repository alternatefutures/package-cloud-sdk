import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse, http } from 'msw';

import { localhost, mockGraphqlServiceApiUrl } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const queries = [
  localhost.query('GetProject', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        project: {
          avatar: null,
          backupStorageOnArweave: false,
          backupStorageOnFilecoin: false,
          createdAt: '2023-03-23T08:05:13.641Z',
          id: 'clgkiwjd8000c08mefyco2eoo',
          name: 'electronicCo',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.query('GetProjects', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        projects: {
          data: [
            {
              avatar: null,
              backupStorageOnArweave: false,
              backupStorageOnFilecoin: false,
              createdAt: '2024-01-04T12:05:13.641Z',
              id: 'clt5ter6y000008jxd9lp8vez',
              name: 'dreamTeam',
            },
            {
              avatar: null,
              backupStorageOnArweave: false,
              backupStorageOnFilecoin: false,
              createdAt: '2023-03-23T08:05:13.641Z',
              id: 'clgkiwjd8000c08mefyco2eoo',
              name: 'electronicCo',
            },
            {
              avatar: null,
              backupStorageOnArweave: false,
              backupStorageOnFilecoin: false,
              createdAt: '2023-03-30T08:05:13.641Z',
              id: 'clgukvjww000108kw2h8n09nx',
              name: 'electronicLtd',
            },
            {
              avatar: 'd.png',
              backupStorageOnArweave: false,
              backupStorageOnFilecoin: false,
              createdAt: '2023-03-20T08:05:13.641Z',
              id: 'clgkivku7000a08me9coi0civ',
              name: 'vegetableCo',
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
  localhost.mutation('CreateProject', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        createProject: {
          avatar: null,
          backupStorageOnArweave: false,
          backupStorageOnFilecoin: true,
          createdAt: '2023-03-24T09:05:13.641Z',
          id: 'clje357cc000108jse08c2t6m',
          name: 'new-project',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation('UpdateProject', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        updateProject: {
          avatar: variables.v2?.avatar ? 'https://secret-asset-url/cid?token=eyJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJRbVNOWHVIckpIUW03QTNlbjh5YjR6ZHZwWGdDYzFVRVc3Z1FVSFM5dmRnWEYxIiwiZXhwIjoxNzI3Nzk3OTA3fQ.UBUUQ2sk0-b60SbyoAKOXsFSgOJ_uJh_IA85-V9JU2E' : null,
          backupStorageOnArweave: variables.v2?.backupStorageOnArweave ?? false,
          backupStorageOnFilecoin: variables.v2?.backupStorageOnFilecoin ?? false,
          createdAt: '2023-03-23T08:05:13.641Z',
          id: 'clgkiwjd8000c08mefyco2eoo',
          name: variables.v2?.name || 'electronicCo',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
];

// Fallback handler for multipart form-data GraphQL requests (must come first)
const multipartHandler = http.post(mockGraphqlServiceApiUrl, async ({ request }) => {
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

      // Handle UpdateProject mutation
      if (query.includes('updateProject')) {
        const res = await executeGraphql({
          schema,
          source: query,
          variableValues: variables,
          rootValue: {
            updateProject: {
              avatar: variables.v2?.avatar !== null ? 'https://secret-asset-url/cid?token=eyJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJRbVNOWHVIckpIUW03QTNlbjh5YjR6ZHZwWGdDYzFVRVc3Z1FVSFM5dmRnWEYxIiwiZXhwIjoxNzI3Nzk3OTA3fQ.UBUUQ2sk0-b60SbyoAKOXsFSgOJ_uJh_IA85-V9JU2E' : null,
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
    } catch (error) {
      console.error('Error handling multipart GraphQL request:', error);
    }

    return;
  });

export const handlers = [multipartHandler, ...queries, ...mutations];
