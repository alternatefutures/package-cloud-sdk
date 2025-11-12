import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const queries = [
  localhost.query('GetIpnsRecords', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        ipnsRecords: {
          data: [
            {
              ensRecords: [
                {
                  id: '8d3ad502-ec4d-489e-858e-d112656f3511',
                },
                {
                  id: 'clm0mhccs000108ma34jn6ed3',
                },
              ],
              hash: 'QmcvfRw5WDutRzvRNq2matcJWW2nKWFGDbqxaaTxnWksME',
              id: 'clgkj995t000108med7gb2w4v',
              name: 'k51qzi5uqu5dhrupvn0ru1c6el43rhimh95cuiwqy0ofo8bgomvq296b49v9r7',
            },
            {
              ensRecords: [
                {
                  id: '40767ba9-eb85-439b-9369-489459a9376b',
                },
              ],
              hash: 'QmX7WyiLtbvmfbUzN2eJuvmDuGZSDjavuauwaJL4bFC5SJ',
              id: 'clgkj9ipf000208me9yzre1cn',
              name: 'k51qzi5uqu5dh2c8ec00yowiapopchxdvnwh6iy2xoxc51inldruqh4yvzgez5',
            },
            {
              ensRecords: [
                {
                  id: 'af470cc1-08d8-4d39-be6f-b0eebc0a6480',
                },
              ],
              hash: 'QmW73w6jvat7zDpFkYHft8eB88LiU6fPyV9LUX9et7XRUy',
              id: 'clgkj9pfa000308meh73d8nff',
              name: 'k51qzi5uqu5dipwqop5kj5na30qlwqbyyn54g8y3jcm3sdc02t9tjlec2a46ci',
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
  localhost.query('GetIpnsRecordByName', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        ipnsRecord: {
          ensRecords: [
            {
              id: '8d3ad502-ec4d-489e-858e-d112656f3511',
            },
            {
              id: 'clm0mhccs000108ma34jn6ed3',
            },
          ],
          hash: 'QmcvfRw5WDutRzvRNq2matcJWW2nKWFGDbqxaaTxnWksME',
          id: 'clgkj995t000108med7gb2w4v',
          name: 'k51qzi5uqu5dhrupvn0ru1c6el43rhimh95cuiwqy0ofo8bgomvq296b49v9r7',
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
  localhost.mutation('PublishSignedIpnsName', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        publishSignedIpnsName:
          'k51qzi5uqu5dgsc1bvsuk1x84bptdvp8cupbnnbqxpxzd629gadpci3kpcm311',
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation('PublishIpnsRecord', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        publishIpnsRecord: {
          ensRecords: [
            {
              id: '8d3ad502-ec4d-489e-858e-d112656f3511',
            },
            {
              id: 'clm0mhccs000108ma34jn6ed3',
            },
          ],
          hash: 'QmRG4xcsmoZuXqKuPz3uVBgvo3GZ6k1kLZWhmvzuKtDr9s',
          id: 'clgkj995t000108med7gb2w4v',
          name: 'k51qzi5uqu5dhrupvn0ru1c6el43rhimh95cuiwqy0ofo8bgomvq296b49v9r7',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation('CreateIpnsRecord', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        createIpnsRecord: {
          ensRecords: [],
          hash: null,
          id: 'clgmg76ch000208mid5o30du0',
          name: 'test-name',
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation(
    'CreateIpnsRecordForSite',
    async ({ query, variables }) => {
      const res = await executeGraphql({
        schema,
        source: query,
        variableValues: variables,
        rootValue: {
          createIpnsRecordForSite: {
            ensRecords: [],
            hash: 'bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva',
            id: 'clgmg76ch000208mid5o30du0',
            name: 'test-name',
          },
        },
      });

      return HttpResponse.json({
        data: res.data,
        errors: res.errors,
      });
    },
  ),
  localhost.mutation('DeleteIpnsRecord', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        deleteIpnsRecord: {
          ensRecords: [],
          hash: 'QmcvfRw5WDutRzvRNq2matcJWW2nKWFGDbqxaaTxnWksME',
          id: 'clgkj995t000108med7gb2w4v',
          name: 'k51qzi5uqu5dhrupvn0ru1c6el43rhimh95cuiwqy0ofo8bgomvq296b49v9r7',
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
