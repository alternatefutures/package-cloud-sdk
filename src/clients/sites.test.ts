import { describe, expect, it, afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/graphql/node';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl } from '../mocks/graphql/handlers';
import { AlternateFuturesSdk } from '../AlternateFuturesSdk';
import state from '../mocks/state';

describe('Sites', () => {
  const sdk = new AlternateFuturesSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should get site by its id', async (context) => {
    const response = await sdk
      .sites()
      .get({ id: state.sites.site.electronicCoEshop.id });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "deployments": Array [
          Object {
            "__typename": "Deployment",
            "cid": "bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva",
            "createdAt": "2023-03-24T10:05:13.641Z",
            "id": "clgmajwf7000208mo67lnhgu0",
            "siteId": "clgma7ilu000008jzdlwhb76a",
            "status": "BUILD_IN_PROGRESS",
            "storageType": "IPFS",
            "updatedAt": "2023-03-24T10:06:13.641Z",
          },
          Object {
            "__typename": "Deployment",
            "cid": "bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q",
            "createdAt": "2023-03-24T09:05:13.641Z",
            "id": "clgmajsoo000108moef7f1yt0",
            "siteId": "clgma7ilu000008jzdlwhb76a",
            "status": "RELEASE_COMPLETED",
            "storageType": "IPFS",
            "updatedAt": "2023-03-24T09:08:13.641Z",
          },
          Object {
            "__typename": "Deployment",
            "cid": "bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glaaa",
            "createdAt": "2023-03-23T10:05:13.641Z",
            "id": "clgmajwf7000208mo67lnh000",
            "siteId": "clgma7ilu000008jzdlwhb76a",
            "status": "RELEASE_COMPLETED",
            "storageType": "IPFS",
            "updatedAt": "2023-03-23T10:05:13.641Z",
          },
        ],
        "domains": Array [
          Object {
            "__typename": "Domain",
            "hostname": "electronic.co",
            "id": "clgmfj1pa000108lc0g5i7d32",
          },
          Object {
            "__typename": "Domain",
            "hostname": "eshop-electronic.co",
            "id": "clgmfj874000208lc2e9ccglf",
          },
          Object {
            "__typename": "Domain",
            "hostname": "static.eshop-electronic.co",
            "id": "clmhwwted000108mnajduel68",
          },
        ],
        "id": "clgma7ilu000008jzdlwhb76a",
        "ipnsRecords": Array [
          Object {
            "__typename": "IpnsRecord",
            "id": "clgkj995t000108med7gb2w4v",
          },
        ],
        "name": "electronic-co-shop",
        "slug": "blue-green-yellow",
        "zones": Array [
          Object {
            "__typename": "SiteZone",
            "id": "clgmfj874000208lc2e9ccglf",
            "status": "CREATED",
          },
          Object {
            "__typename": "SiteZone",
            "id": "cljfq6n2y000008lb4oy403bc",
            "status": "CREATED",
          },
        ],
      }
    `);
  });

  it('should get site by its slug', async () => {
    const response = await sdk
      .sites()
      .getBySlug({ slug: state.sites.site.electronicCoEshop.slug });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "deployments": Array [
          Object {
            "__typename": "Deployment",
            "cid": "bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva",
            "createdAt": "2023-03-24T10:05:13.641Z",
            "id": "clgmajwf7000208mo67lnhgu0",
            "siteId": "clgma7ilu000008jzdlwhb76a",
            "status": "BUILD_IN_PROGRESS",
            "storageType": "IPFS",
            "updatedAt": "2023-03-24T10:06:13.641Z",
          },
          Object {
            "__typename": "Deployment",
            "cid": "bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q",
            "createdAt": "2023-03-24T09:05:13.641Z",
            "id": "clgmajsoo000108moef7f1yt0",
            "siteId": "clgma7ilu000008jzdlwhb76a",
            "status": "RELEASE_COMPLETED",
            "storageType": "IPFS",
            "updatedAt": "2023-03-24T09:08:13.641Z",
          },
          Object {
            "__typename": "Deployment",
            "cid": "bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glaaa",
            "createdAt": "2023-03-23T10:05:13.641Z",
            "id": "clgmajwf7000208mo67lnh000",
            "siteId": "clgma7ilu000008jzdlwhb76a",
            "status": "RELEASE_COMPLETED",
            "storageType": "IPFS",
            "updatedAt": "2023-03-23T10:05:13.641Z",
          },
        ],
        "domains": Array [
          Object {
            "__typename": "Domain",
            "hostname": "electronic.co",
            "id": "clgmfj1pa000108lc0g5i7d32",
          },
          Object {
            "__typename": "Domain",
            "hostname": "eshop-electronic.co",
            "id": "clgmfj874000208lc2e9ccglf",
          },
          Object {
            "__typename": "Domain",
            "hostname": "static.eshop-electronic.co",
            "id": "clmhwwted000108mnajduel68",
          },
        ],
        "id": "clgma7ilu000008jzdlwhb76a",
        "ipnsRecords": Array [
          Object {
            "__typename": "IpnsRecord",
            "id": "clgkj995t000108med7gb2w4v",
          },
        ],
        "name": "electronic-co-shop",
        "slug": "blue-green-yellow",
        "zones": Array [
          Object {
            "__typename": "SiteZone",
            "id": "clgmfj874000208lc2e9ccglf",
            "status": "CREATED",
          },
          Object {
            "__typename": "SiteZone",
            "id": "cljfq6n2y000008lb4oy403bc",
            "status": "CREATED",
          },
        ],
      }
    `);
  });

  it('list sites', async () => {
    const response = await sdk.sites().list();

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "deployments": Array [
            Object {
              "__typename": "Deployment",
              "cid": "bafybeifcesfwifuhcshuobdgw6kod4jzinu4u4v2lzjzdmps3ndaydrsri",
              "createdAt": "2023-08-21T19:00:51.038Z",
              "id": "clmz7kxj60003mk08eg5wmtqh",
              "siteId": "clmkp5nn50000mm08yq7hierx",
              "status": "RELEASE_COMPLETED",
              "storageType": "IPFS",
              "updatedAt": "2023-08-21T19:04:04.569Z",
            },
          ],
          "domains": Array [],
          "id": "clmkp5nn50000mm08yq7hierx",
          "ipnsRecords": Array [],
          "name": "electronicCoLanding",
          "slug": "red-green-blue",
          "zones": Array [],
        },
        Object {
          "deployments": Array [
            Object {
              "__typename": "Deployment",
              "cid": "bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q",
              "createdAt": "2023-03-25T10:05:13.641Z",
              "id": "clgmak57r000408mo9wd65hpf",
              "siteId": "clgma7mmh000108jzd13c50ol",
              "status": "RELEASE_COMPLETED",
              "storageType": "IPFS",
              "updatedAt": "2023-03-25T10:08:13.641Z",
            },
            Object {
              "__typename": "Deployment",
              "cid": null,
              "createdAt": "2023-03-25T09:05:13.641Z",
              "id": "clgmak03f000308modn0j7lrq",
              "siteId": "clgma7mmh000108jzd13c50ol",
              "status": "CREATED",
              "storageType": "IPFS",
              "updatedAt": "2023-03-25T09:08:13.641Z",
            },
            Object {
              "__typename": "Deployment",
              "cid": null,
              "createdAt": "2023-03-25T09:05:13.641Z",
              "id": "clgmak03f000308modn0j7ltq",
              "siteId": "clgma7mmh000108jzd13c50ol",
              "status": "RELEASE_FAILED",
              "storageType": "IPFS",
              "updatedAt": "2023-03-25T09:08:13.641Z",
            },
          ],
          "domains": Array [
            Object {
              "__typename": "Domain",
              "hostname": "blog-electornic.co",
              "id": "clgnslqvg000108l6hg5ea3u0",
            },
            Object {
              "__typename": "Domain",
              "hostname": "dnslink-electornic.co",
              "id": "clgnslqvg000108l6hg5ea3u1",
            },
          ],
          "id": "clgma7mmh000108jzd13c50ol",
          "ipnsRecords": Array [
            Object {
              "__typename": "IpnsRecord",
              "id": "clgkj9ipf000208me9yzre1cn",
            },
          ],
          "name": "electronic-co-blog",
          "slug": "white-black-silver",
          "zones": Array [
            Object {
              "__typename": "SiteZone",
              "id": "clgow7wob000508jog5gfanj9",
              "status": "CREATED",
            },
          ],
        },
        Object {
          "deployments": Array [],
          "domains": Array [],
          "id": "clje32iwx000008js9rjb5uoo",
          "ipnsRecords": Array [],
          "name": "electronic-co-videos",
          "slug": "green-gold-silver",
          "zones": Array [
            Object {
              "__typename": "SiteZone",
              "id": "clje357cc000108jse08c2t6m",
              "status": "CREATING_FAILED",
            },
          ],
        },
        Object {
          "deployments": Array [
            Object {
              "__typename": "Deployment",
              "cid": "bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva",
              "createdAt": "2023-03-24T10:05:13.641Z",
              "id": "clgmajwf7000208mo67lnhgu0",
              "siteId": "clgma7ilu000008jzdlwhb76a",
              "status": "BUILD_IN_PROGRESS",
              "storageType": "IPFS",
              "updatedAt": "2023-03-24T10:06:13.641Z",
            },
            Object {
              "__typename": "Deployment",
              "cid": "bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q",
              "createdAt": "2023-03-24T09:05:13.641Z",
              "id": "clgmajsoo000108moef7f1yt0",
              "siteId": "clgma7ilu000008jzdlwhb76a",
              "status": "RELEASE_COMPLETED",
              "storageType": "IPFS",
              "updatedAt": "2023-03-24T09:08:13.641Z",
            },
            Object {
              "__typename": "Deployment",
              "cid": "bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glaaa",
              "createdAt": "2023-03-23T10:05:13.641Z",
              "id": "clgmajwf7000208mo67lnh000",
              "siteId": "clgma7ilu000008jzdlwhb76a",
              "status": "RELEASE_COMPLETED",
              "storageType": "IPFS",
              "updatedAt": "2023-03-23T10:05:13.641Z",
            },
          ],
          "domains": Array [
            Object {
              "__typename": "Domain",
              "hostname": "electronic.co",
              "id": "clgmfj1pa000108lc0g5i7d32",
            },
            Object {
              "__typename": "Domain",
              "hostname": "eshop-electronic.co",
              "id": "clgmfj874000208lc2e9ccglf",
            },
            Object {
              "__typename": "Domain",
              "hostname": "static.eshop-electronic.co",
              "id": "clmhwwted000108mnajduel68",
            },
          ],
          "id": "clgma7ilu000008jzdlwhb76a",
          "ipnsRecords": Array [
            Object {
              "__typename": "IpnsRecord",
              "id": "clgkj995t000108med7gb2w4v",
            },
          ],
          "name": "electronic-co-shop",
          "slug": "blue-green-yellow",
          "zones": Array [
            Object {
              "__typename": "SiteZone",
              "id": "clgmfj874000208lc2e9ccglf",
              "status": "CREATED",
            },
            Object {
              "__typename": "SiteZone",
              "id": "cljfq6n2y000008lb4oy403bc",
              "status": "CREATED",
            },
          ],
        },
      ]
    `);
  });

  it('should create site', async () => {
    const response = await sdk.sites().create({
      name: 'new-site',
    });

    expect(response).toMatchInlineSnapshot(
      { id: expect.any(String) },
      `
      Object {
        "deployments": Array [],
        "domains": Array [],
        "id": Any<String>,
        "ipnsRecords": Array [],
        "name": "new-site",
        "slug": "crooked-bland-jackal",
        "zones": Array [],
      }
    `,
    );
  });

  it('should delete site', async () => {
    const response = await sdk.sites().delete({
      id: state.sites.site.electronicCoVideos.id,
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "deployments": Array [],
        "domains": Array [],
        "id": "clje32iwx000008js9rjb5uoo",
        "ipnsRecords": Array [],
        "name": "electronic-co-videos",
        "slug": "green-gold-silver",
        "zones": Array [
          Object {
            "__typename": "SiteZone",
            "id": "clje357cc000108jse08c2t6m",
            "status": "CREATING_FAILED",
          },
        ],
      }
    `);
  });

  it('should create custom ipfs deployment', async () => {
    const response = await sdk.sites().createCustomIpfsDeployment({
      siteId: state.sites.site.electronicCoBlog.id,
      cid: 'QmcZhtEFcTJfa1UPhVgHNp5i2YzjzB4tckaMnyVd5SgSqs',
    });

    expect(response).toMatchInlineSnapshot(
      {
        createdAt: expect.anything(),
        id: expect.any(String),
        updatedAt: expect.anything(),
      },
      `
      Object {
        "__typename": "Deployment",
        "cid": "bafybeigtlpa4nljtqlhagceubl3xidofy6iriovqr55ex7pqnpq5eq5fxy",
        "createdAt": Anything,
        "id": Any<String>,
        "siteId": "clgma7mmh000108jzd13c50ol",
        "status": "UPLOAD_COMPLETED",
        "storageType": "IPFS",
        "updatedAt": Anything,
      }
    `,
    );
  });

  it('get deployment by its id', async () => {
    const response = await sdk
      .sites()
      .getDeployment({ id: state.sites.deployment.electronicCoEshopV2.id });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "__typename": "Deployment",
        "cid": "bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva",
        "createdAt": "2023-03-24T10:05:13.641Z",
        "id": "clgmajwf7000208mo67lnhgu0",
        "siteId": "clgma7ilu000008jzdlwhb76a",
        "status": "BUILD_IN_PROGRESS",
        "storageType": "IPFS",
        "updatedAt": "2023-03-24T10:06:13.641Z",
      }
    `);
  });
});
