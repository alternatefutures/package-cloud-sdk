import { graphql as executeGraphql, buildSchema } from 'graphql';
import { HttpResponse } from 'msw';

import { localhost } from '@mocks/graphql/config';
import { schemaStr } from '@mocks/graphql/schema';

const schema = buildSchema(schemaStr);

const queries = [
  localhost.query('GetSiteById', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        site: {
          deployments: [
            {
              __typename: 'Deployment',
              cid: 'bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva',
              createdAt: '2023-03-24T10:05:13.641Z',
              id: 'clgmajwf7000208mo67lnhgu0',
              siteId: 'clgma7ilu000008jzdlwhb76a',
              status: 'BUILD_IN_PROGRESS',
              storageType: 'IPFS',
              updatedAt: '2023-03-24T10:06:13.641Z',
            },
            {
              __typename: 'Deployment',
              cid: 'bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q',
              createdAt: '2023-03-24T09:05:13.641Z',
              id: 'clgmajsoo000108moef7f1yt0',
              siteId: 'clgma7ilu000008jzdlwhb76a',
              status: 'RELEASE_COMPLETED',
              storageType: 'IPFS',
              updatedAt: '2023-03-24T09:08:13.641Z',
            },
            {
              __typename: 'Deployment',
              cid: 'bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glaaa',
              createdAt: '2023-03-23T10:05:13.641Z',
              id: 'clgmajwf7000208mo67lnh000',
              siteId: 'clgma7ilu000008jzdlwhb76a',
              status: 'RELEASE_COMPLETED',
              storageType: 'IPFS',
              updatedAt: '2023-03-23T10:05:13.641Z',
            },
          ],
          domains: [
            {
              __typename: 'Domain',
              hostname: 'electronic.co',
              id: 'clgmfj1pa000108lc0g5i7d32',
            },
            {
              __typename: 'Domain',
              hostname: 'eshop-electronic.co',
              id: 'clgmfj874000208lc2e9ccglf',
            },
            {
              __typename: 'Domain',
              hostname: 'static.eshop-electronic.co',
              id: 'clmhwwted000108mnajduel68',
            },
          ],
          id: 'clgma7ilu000008jzdlwhb76a',
          ipnsRecords: [
            {
              __typename: 'IpnsRecord',
              id: 'clgkj995t000108med7gb2w4v',
            },
          ],
          name: 'electronic-co-shop',
          slug: 'blue-green-yellow',
          zones: [
            {
              __typename: 'SiteZone',
              id: 'clgmfj874000208lc2e9ccglf',
              status: 'CREATED',
            },
            {
              __typename: 'SiteZone',
              id: 'cljfq6n2y000008lb4oy403bc',
              status: 'CREATED',
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
  localhost.query('GetSiteBySlug', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        siteBySlug: {
          deployments: [
            {
              __typename: 'Deployment',
              cid: 'bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva',
              createdAt: '2023-03-24T10:05:13.641Z',
              id: 'clgmajwf7000208mo67lnhgu0',
              siteId: 'clgma7ilu000008jzdlwhb76a',
              status: 'BUILD_IN_PROGRESS',
              storageType: 'IPFS',
              updatedAt: '2023-03-24T10:06:13.641Z',
            },
            {
              __typename: 'Deployment',
              cid: 'bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q',
              createdAt: '2023-03-24T09:05:13.641Z',
              id: 'clgmajsoo000108moef7f1yt0',
              siteId: 'clgma7ilu000008jzdlwhb76a',
              status: 'RELEASE_COMPLETED',
              storageType: 'IPFS',
              updatedAt: '2023-03-24T09:08:13.641Z',
            },
            {
              __typename: 'Deployment',
              cid: 'bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glaaa',
              createdAt: '2023-03-23T10:05:13.641Z',
              id: 'clgmajwf7000208mo67lnh000',
              siteId: 'clgma7ilu000008jzdlwhb76a',
              status: 'RELEASE_COMPLETED',
              storageType: 'IPFS',
              updatedAt: '2023-03-23T10:05:13.641Z',
            },
          ],
          domains: [
            {
              __typename: 'Domain',
              hostname: 'electronic.co',
              id: 'clgmfj1pa000108lc0g5i7d32',
            },
            {
              __typename: 'Domain',
              hostname: 'eshop-electronic.co',
              id: 'clgmfj874000208lc2e9ccglf',
            },
            {
              __typename: 'Domain',
              hostname: 'static.eshop-electronic.co',
              id: 'clmhwwted000108mnajduel68',
            },
          ],
          id: 'clgma7ilu000008jzdlwhb76a',
          ipnsRecords: [
            {
              __typename: 'IpnsRecord',
              id: 'clgkj995t000108med7gb2w4v',
            },
          ],
          name: 'electronic-co-shop',
          slug: 'blue-green-yellow',
          zones: [
            {
              __typename: 'SiteZone',
              id: 'clgmfj874000208lc2e9ccglf',
              status: 'CREATED',
            },
            {
              __typename: 'SiteZone',
              id: 'cljfq6n2y000008lb4oy403bc',
              status: 'CREATED',
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
  localhost.query('GetSites', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        sites: {
          data: [
            {
              deployments: [
                {
                  __typename: 'Deployment',
                  cid: 'bafybeifcesfwifuhcshuobdgw6kod4jzinu4u4v2lzjzdmps3ndaydrsri',
                  createdAt: '2023-08-21T19:00:51.038Z',
                  id: 'clmz7kxj60003mk08eg5wmtqh',
                  siteId: 'clmkp5nn50000mm08yq7hierx',
                  status: 'RELEASE_COMPLETED',
                  storageType: 'IPFS',
                  updatedAt: '2023-08-21T19:04:04.569Z',
                },
              ],
              domains: [],
              id: 'clmkp5nn50000mm08yq7hierx',
              ipnsRecords: [],
              name: 'electronicCoLanding',
              slug: 'red-green-blue',
              zones: [],
            },
            {
              deployments: [
                {
                  __typename: 'Deployment',
                  cid: 'bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q',
                  createdAt: '2023-03-25T10:05:13.641Z',
                  id: 'clgmak57r000408mo9wd65hpf',
                  siteId: 'clgma7mmh000108jzd13c50ol',
                  status: 'RELEASE_COMPLETED',
                  storageType: 'IPFS',
                  updatedAt: '2023-03-25T10:08:13.641Z',
                },
                {
                  __typename: 'Deployment',
                  cid: null,
                  createdAt: '2023-03-25T09:05:13.641Z',
                  id: 'clgmak03f000308modn0j7lrq',
                  siteId: 'clgma7mmh000108jzd13c50ol',
                  status: 'CREATED',
                  storageType: 'IPFS',
                  updatedAt: '2023-03-25T09:08:13.641Z',
                },
                {
                  __typename: 'Deployment',
                  cid: null,
                  createdAt: '2023-03-25T09:05:13.641Z',
                  id: 'clgmak03f000308modn0j7ltq',
                  siteId: 'clgma7mmh000108jzd13c50ol',
                  status: 'RELEASE_FAILED',
                  storageType: 'IPFS',
                  updatedAt: '2023-03-25T09:08:13.641Z',
                },
              ],
              domains: [
                {
                  __typename: 'Domain',
                  hostname: 'blog-electornic.co',
                  id: 'clgnslqvg000108l6hg5ea3u0',
                },
                {
                  __typename: 'Domain',
                  hostname: 'dnslink-electornic.co',
                  id: 'clgnslqvg000108l6hg5ea3u1',
                },
              ],
              id: 'clgma7mmh000108jzd13c50ol',
              ipnsRecords: [
                {
                  __typename: 'IpnsRecord',
                  id: 'clgkj9ipf000208me9yzre1cn',
                },
              ],
              name: 'electronic-co-blog',
              slug: 'white-black-silver',
              zones: [
                {
                  __typename: 'SiteZone',
                  id: 'clgow7wob000508jog5gfanj9',
                  status: 'CREATED',
                },
              ],
            },
            {
              deployments: [],
              domains: [],
              id: 'clje32iwx000008js9rjb5uoo',
              ipnsRecords: [],
              name: 'electronic-co-videos',
              slug: 'green-gold-silver',
              zones: [
                {
                  __typename: 'SiteZone',
                  id: 'clje357cc000108jse08c2t6m',
                  status: 'CREATING_FAILED',
                },
              ],
            },
            {
              deployments: [
                {
                  __typename: 'Deployment',
                  cid: 'bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva',
                  createdAt: '2023-03-24T10:05:13.641Z',
                  id: 'clgmajwf7000208mo67lnhgu0',
                  siteId: 'clgma7ilu000008jzdlwhb76a',
                  status: 'BUILD_IN_PROGRESS',
                  storageType: 'IPFS',
                  updatedAt: '2023-03-24T10:06:13.641Z',
                },
                {
                  __typename: 'Deployment',
                  cid: 'bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q',
                  createdAt: '2023-03-24T09:05:13.641Z',
                  id: 'clgmajsoo000108moef7f1yt0',
                  siteId: 'clgma7ilu000008jzdlwhb76a',
                  status: 'RELEASE_COMPLETED',
                  storageType: 'IPFS',
                  updatedAt: '2023-03-24T09:08:13.641Z',
                },
                {
                  __typename: 'Deployment',
                  cid: 'bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glaaa',
                  createdAt: '2023-03-23T10:05:13.641Z',
                  id: 'clgmajwf7000208mo67lnh000',
                  siteId: 'clgma7ilu000008jzdlwhb76a',
                  status: 'RELEASE_COMPLETED',
                  storageType: 'IPFS',
                  updatedAt: '2023-03-23T10:05:13.641Z',
                },
              ],
              domains: [
                {
                  __typename: 'Domain',
                  hostname: 'electronic.co',
                  id: 'clgmfj1pa000108lc0g5i7d32',
                },
                {
                  __typename: 'Domain',
                  hostname: 'eshop-electronic.co',
                  id: 'clgmfj874000208lc2e9ccglf',
                },
                {
                  __typename: 'Domain',
                  hostname: 'static.eshop-electronic.co',
                  id: 'clmhwwted000108mnajduel68',
                },
              ],
              id: 'clgma7ilu000008jzdlwhb76a',
              ipnsRecords: [
                {
                  __typename: 'IpnsRecord',
                  id: 'clgkj995t000108med7gb2w4v',
                },
              ],
              name: 'electronic-co-shop',
              slug: 'blue-green-yellow',
              zones: [
                {
                  __typename: 'SiteZone',
                  id: 'clgmfj874000208lc2e9ccglf',
                  status: 'CREATED',
                },
                {
                  __typename: 'SiteZone',
                  id: 'cljfq6n2y000008lb4oy403bc',
                  status: 'CREATED',
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
  localhost.query('GetDeploymentById', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        deployment: {
          __typename: 'Deployment',
          cid: 'bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva',
          createdAt: '2023-03-24T10:05:13.641Z',
          id: 'clgmajwf7000208mo67lnhgu0',
          siteId: 'clgma7ilu000008jzdlwhb76a',
          status: 'BUILD_IN_PROGRESS',
          storageType: 'IPFS',
          updatedAt: '2023-03-24T10:06:13.641Z',
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
  localhost.mutation('CreateSite', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        createSite: {
          deployments: [],
          domains: [],
          id: 'clgmajwf7000208mo67lnhgu0',
          ipnsRecords: [],
          name: 'new-site',
          slug: 'crooked-bland-jackal',
          zones: [],
        },
      },
    });

    return HttpResponse.json({
      data: res.data,
      errors: res.errors,
    });
  }),
  localhost.mutation('DeleteSite', async ({ query, variables }) => {
    const res = await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        deleteSite: {
          deployments: [],
          domains: [],
          id: 'clje32iwx000008js9rjb5uoo',
          ipnsRecords: [],
          name: 'electronic-co-videos',
          slug: 'green-gold-silver',
          zones: [
            {
              __typename: 'SiteZone',
              id: 'clje357cc000108jse08c2t6m',
              status: 'CREATING_FAILED',
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
  localhost.mutation(
    'CreateCustomIpfsDeployment',
    async ({ query, variables }) => {
      const res = await executeGraphql({
        schema,
        source: query,
        variableValues: variables,
        rootValue: {
          createCustomIpfsDeployment: {
            __typename: 'Deployment',
            cid: 'bafybeigtlpa4nljtqlhagceubl3xidofy6iriovqr55ex7pqnpq5eq5fxy',
            id: 'clgmajwf7000208mo67lnhgu0',
            siteId: 'clgma7mmh000108jzd13c50ol',
            status: 'UPLOAD_COMPLETED',
            storageType: 'IPFS',
            updatedAt: '2023-03-24T10:06:13.641Z',
            createdAt: '2023-03-24T10:06:13.641Z',
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
