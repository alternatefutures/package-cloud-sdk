import { describe, expect, it, afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/graphql/node';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl } from '../mocks/graphql/handlers';
import { FleekSdk } from '../FleekSdk';
import state from '../mocks/state';

describe('Applications', () => {
  const sdk = new FleekSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should get application', async () => {
    const response = await sdk.applications().get({
      id: state.auth.application.electronicCoMobileApp.id,
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "clientId": "client_SCmayempJ1d953yjn1yx",
        "createdAt": "2023-03-23T12:05:13.641Z",
        "id": "cli2ymypd000208l86gjd6p17",
        "name": "electronicCoMobileApp",
        "updatedAt": "2023-03-23T12:05:13.641Z",
        "whiteLabelDomains": Array [
          Object {
            "hostname": "app.best-electronic.co",
            "id": "clu2xf6uz000208jv6qskg1hm",
          },
          Object {
            "hostname": "app.electronic.co",
            "id": "clu2xd1bs000108jv0v0d2xmy",
          },
        ],
        "whitelistDomains": Array [
          Object {
            "hostname": "app.best-electronic.co",
            "id": "cli2z1zim000008l66z4l7qg3",
          },
          Object {
            "hostname": "app.electronic.co",
            "id": "cli2z10wq000208jw42gd4pyh",
          },
        ],
      }
    `);
  });

  it('should list applications', async () => {
    const response = await sdk.applications().list();

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "clientId": "client_ZRacrn3b1ForrjK5u8VD",
          "createdAt": "2023-03-23T11:05:13.641Z",
          "id": "cli2ymucu000108l81grqhzcp",
          "name": "electronicCoWebApp",
          "updatedAt": "2023-03-23T11:05:13.641Z",
          "whiteLabelDomains": Array [],
          "whitelistDomains": Array [],
        },
        Object {
          "clientId": "client_SCmayempJ1d953yjn1yx",
          "createdAt": "2023-03-23T12:05:13.641Z",
          "id": "cli2ymypd000208l86gjd6p17",
          "name": "electronicCoMobileApp",
          "updatedAt": "2023-03-23T12:05:13.641Z",
          "whiteLabelDomains": Array [
            Object {
              "hostname": "app.best-electronic.co",
              "id": "clu2xf6uz000208jv6qskg1hm",
            },
            Object {
              "hostname": "app.electronic.co",
              "id": "clu2xd1bs000108jv0v0d2xmy",
            },
          ],
          "whitelistDomains": Array [
            Object {
              "hostname": "app.best-electronic.co",
              "id": "cli2z1zim000008l66z4l7qg3",
            },
            Object {
              "hostname": "app.electronic.co",
              "id": "cli2z10wq000208jw42gd4pyh",
            },
          ],
        },
      ]
    `);
  });

  it('should create application', async () => {
    const response = await sdk.applications().create({
      name: 'test-application',
      whitelistDomains: ['alternatefutures.ai'],
    });

    // TODO: This mandates returning whitelistDomains
    // and whiteLabelDomains, while the non-schema version
    // does not requires it for some reason.
    // Do a test in runtime to check
    // see handler
    expect(response).toMatchInlineSnapshot(
      {
        createdAt: expect.anything(),
        id: expect.any(String),
        updatedAt: expect.anything(),
      },
      `
      Object {
        "clientId": "client_testtesttest",
        "createdAt": Anything,
        "id": Any<String>,
        "name": "test-application",
        "updatedAt": Anything,
        "whiteLabelDomains": Array [],
        "whitelistDomains": Array [],
      }
    `,
    );
  });

  it('should update application', async () => {
    const response = await sdk.applications().update({
      id: state.auth.application.electronicCoMobileApp.id,
      name: 'new-mobile-app-name',
    });

    expect(response).toMatchInlineSnapshot(
      { updatedAt: expect.anything() },
      `
      Object {
        "clientId": "client_SCmayempJ1d953yjn1yx",
        "createdAt": "2023-03-23T12:05:13.641Z",
        "id": "cli2ymypd000208l86gjd6p17",
        "name": "new-mobile-app-name",
        "updatedAt": Anything,
        "whiteLabelDomains": Array [
          Object {
            "hostname": "app.best-electronic.co",
            "id": "clu2xf6uz000208jv6qskg1hm",
          },
          Object {
            "hostname": "app.electronic.co",
            "id": "clu2xd1bs000108jv0v0d2xmy",
          },
        ],
        "whitelistDomains": Array [
          Object {
            "hostname": "app.best-electronic.co",
            "id": "cli2z1zim000008l66z4l7qg3",
          },
          Object {
            "hostname": "app.electronic.co",
            "id": "cli2z10wq000208jw42gd4pyh",
          },
        ],
      }
    `,
    );
  });

  it('should delete application', async () => {
    const response = await sdk.applications().delete({
      id: state.auth.application.electronicCoMobileApp.id,
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "clientId": "client_SCmayempJ1d953yjn1yx",
        "createdAt": "2023-03-23T12:05:13.641Z",
        "id": "cli2ymypd000208l86gjd6p17",
        "name": "electronicCoMobileApp",
        "updatedAt": "2023-03-23T12:05:13.641Z",
        "whiteLabelDomains": Array [
          Object {
            "hostname": "app.best-electronic.co",
            "id": "clu2xf6uz000208jv6qskg1hm",
          },
          Object {
            "hostname": "app.electronic.co",
            "id": "clu2xd1bs000108jv0v0d2xmy",
          },
        ],
        "whitelistDomains": Array [
          Object {
            "hostname": "app.best-electronic.co",
            "id": "cli2z1zim000008l66z4l7qg3",
          },
          Object {
            "hostname": "app.electronic.co",
            "id": "cli2z10wq000208jw42gd4pyh",
          },
        ],
      }
    `);
  });
});
