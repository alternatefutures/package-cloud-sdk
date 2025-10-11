import { describe, expect, it, afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/graphql/node';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl } from '../mocks/graphql/handlers';
import { AlternateFuturesSdk } from '../AlternateFuturesSdk';
import state from '../mocks/state';

describe('PrivateGateway', () => {
  const sdk = new AlternateFuturesSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('get private gateway by its id', async () => {
    const response = await sdk
      .privateGateways()
      .get({ id: state.storageIpfs.privateGateways.electronicCoEshop.id });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "__typename": "PrivateGateway",
        "createdAt": "2023-03-24T09:05:13.641Z",
        "id": "clhruz26u000108mbdb2zaft0",
        "name": "electronic.co eshop",
        "primaryDomain": Object {
          "__typename": "Domain",
          "id": "clmhwwted000108mnajduel68",
        },
        "project": Object {
          "__typename": "Project",
          "id": "clgkiwjd8000c08mefyco2eoo",
        },
        "slug": "blue-fox-two",
        "updatedAt": "2023-04-24T09:05:13.641Z",
        "zone": Object {
          "__typename": "Zone",
          "id": "cljfq6n2y000008lb4oy403bc",
        },
      }
    `);
  });

  it('get private gateway by its slug', async () => {
    const response = await sdk.privateGateways().getBySlug({
      slug: state.storageIpfs.privateGateways.electronicCoEshop.slug,
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "__typename": "PrivateGateway",
        "createdAt": "2023-03-24T09:05:13.641Z",
        "id": "clhruz26u000108mbdb2zaft0",
        "name": "electronic.co eshop",
        "primaryDomain": Object {
          "__typename": "Domain",
          "id": "clmhwwted000108mnajduel68",
        },
        "project": Object {
          "__typename": "Project",
          "id": "clgkiwjd8000c08mefyco2eoo",
        },
        "slug": "blue-fox-two",
        "updatedAt": "2023-04-24T09:05:13.641Z",
        "zone": Object {
          "__typename": "Zone",
          "id": "cljfq6n2y000008lb4oy403bc",
        },
      }
    `);
  });

  it('list private gateways', async () => {
    const response = await sdk.privateGateways().list();

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "__typename": "PrivateGateway",
          "createdAt": "2023-03-24T09:05:13.641Z",
          "id": "clhruz26u000108mbdb2zaft0",
          "name": "electronic.co eshop",
          "primaryDomain": Object {
            "__typename": "Domain",
            "id": "clmhwwted000108mnajduel68",
          },
          "project": Object {
            "__typename": "Project",
            "id": "clgkiwjd8000c08mefyco2eoo",
          },
          "slug": "blue-fox-two",
          "updatedAt": "2023-04-24T09:05:13.641Z",
          "zone": Object {
            "__typename": "Zone",
            "id": "cljfq6n2y000008lb4oy403bc",
          },
        },
        Object {
          "__typename": "PrivateGateway",
          "createdAt": "2023-04-25T09:05:13.641Z",
          "id": "clj76l893000108l2dsuegrz9",
          "name": "electronic.co photos",
          "primaryDomain": Object {
            "__typename": "Domain",
            "id": "clmhwwted000108mnajduel68",
          },
          "project": Object {
            "__typename": "Project",
            "id": "clgkiwjd8000c08mefyco2eoo",
          },
          "slug": "fish-blue-one",
          "updatedAt": "2023-04-25T11:05:13.641Z",
          "zone": Object {
            "__typename": "Zone",
            "id": "clj76kw6i000008l2ekmz6ahd",
          },
        },
        Object {
          "__typename": "PrivateGateway",
          "createdAt": "2023-03-24T09:05:13.641Z",
          "id": "clu6w5g44000108labn6eai20",
          "name": "electronic.co documents",
          "primaryDomain": Object {
            "__typename": "Domain",
            "id": "clmhwwted000108mnajduel68",
          },
          "project": Object {
            "__typename": "Project",
            "id": "clgkiwjd8000c08mefyco2eoo",
          },
          "slug": "blue-dog-seven",
          "updatedAt": "2023-04-24T09:05:13.641Z",
          "zone": Object {
            "__typename": "Zone",
            "id": "cljfqzrcg000208jy6677aqv1",
          },
        },
      ]
    `);
  });

  it('create private gateway', async () => {
    const name = 'new-gateway';
    const response = await sdk.privateGateways().create({
      name,
      zoneId: state.domains.zone.electronicCoBackupDocuments.id,
    });

    expect(response).toMatchInlineSnapshot(
      {
        createdAt: expect.anything(),
        id: expect.any(String),
        updatedAt: expect.anything(),
        slug: expect.any(String),
        name,
      },
      `
      Object {
        "__typename": "PrivateGateway",
        "createdAt": Anything,
        "id": Any<String>,
        "name": "new-gateway",
        "primaryDomain": Object {
          "__typename": "Domain",
          "id": "clmhwwted000108mnajduel68",
        },
        "project": Object {
          "__typename": "Project",
          "id": "clgkiwjd8000c08mefyco2eoo",
        },
        "slug": Any<String>,
        "updatedAt": Anything,
        "zone": Object {
          "__typename": "Zone",
          "id": "clu71yju0000008ji67mzdyzb",
        },
      }
    `,
    );
  });

  it('delete private gateway', async () => {
    const response = await sdk
      .privateGateways()
      .delete({ id: state.storageIpfs.privateGateways.electronicCoPhotos.id });

    expect(response).toMatchInlineSnapshot(
      { updatedAt: expect.any(String) },
      `
      Object {
        "__typename": "PrivateGateway",
        "createdAt": "2023-04-25T09:05:13.641Z",
        "id": "clj76l893000108l2dsuegrz9",
        "name": "electronic.co photos",
        "primaryDomain": null,
        "project": Object {
          "__typename": "Project",
          "id": "",
        },
        "slug": "fish-blue-one",
        "updatedAt": Any<String>,
        "zone": null,
      }
    `,
    );
  });

  it('update private gateway', async () => {
    const response = await sdk.privateGateways().update({
      id: state.storageIpfs.privateGateways.electronicCoEshop.id,
      name: 'new electronic.co eshop',
    });

    expect(response).toMatchInlineSnapshot(
      { updatedAt: expect.anything() },
      `
      Object {
        "__typename": "PrivateGateway",
        "createdAt": "2023-03-24T09:05:13.641Z",
        "id": "clhruz26u000108mbdb2zaft0",
        "name": "new electronic.co eshop",
        "primaryDomain": Object {
          "__typename": "Domain",
          "id": "clmhwwted000108mnajduel68",
        },
        "project": Object {
          "__typename": "Project",
          "id": "clgkiwjd8000c08mefyco2eoo",
        },
        "slug": "blue-fox-two",
        "updatedAt": Anything,
        "zone": Object {
          "__typename": "Zone",
          "id": "cljfq6n2y000008lb4oy403bc",
        },
      }
    `,
    );
  });
});
