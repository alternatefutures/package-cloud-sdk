import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { AlternateFuturesSdk } from '../AlternateFuturesSdk';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl } from '../mocks/graphql/handlers';
import { server } from '../mocks/graphql/node';
import state from '../mocks/state';

vi.mock('@alternatefutures/utils-token', async (importOriginal) => {
  const original = await importOriginal<typeof import('@alternatefutures/utils-token')>();

  return {
    ...original,
    createApplicationClientId: vi.fn().mockReturnValue('client_testtesttest'),
  };
});

vi.mock('@alternatefutures/utils-text', () => ({
  generateSlug: vi.fn().mockReturnValue('crooked-bland-jackal'),
}));

describe('FleekSDK', () => {
  const sdk = new AlternateFuturesSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should get function by its name', async (context) => {
    const response = await sdk.functions().get({
      name: state.fleekFunctions.fleekFunction.electronicCoEshop.name,
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "currentDeployment": Object {
          "cid": "bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q",
        },
        "currentDeploymentId": "clgmajsoo000108moef7f1yt0",
        "id": "clgma7ilu000008jzdlwhb76a",
        "invokeUrl": "blue-green-yellow.functions.af-cloud.app",
        "name": "electronic-co-shop",
        "projectId": "clgkiwjd8000c08mefyco2eoo",
        "siteId": null,
        "slug": "blue-green-yellow",
        "status": "ACTIVE",
      }
    `);
  });

  it('list functions', async () => {
    const response = await sdk.functions().list();

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "currentDeployment": Object {
            "cid": "bafybeifcesfwifuhcshuobdgw6kod4jzinu4u4v2lzjzdmps3ndaydrsri",
          },
          "currentDeploymentId": "clmz7kxj60003mk08eg5wmtqh",
          "id": "clmkp5nn50000mm08yq7hierx",
          "invokeUrl": "red-green-blue.functions.af-cloud.app",
          "name": "electronicCoLanding",
          "projectId": "clgkiwjd8000c08mefyco2eoo",
          "siteId": null,
          "slug": "red-green-blue",
          "status": "ACTIVE",
        },
        Object {
          "currentDeployment": null,
          "currentDeploymentId": null,
          "id": "clgma7mmh000108jzd13c50ol",
          "invokeUrl": "white-black-silver.functions.af-cloud.app",
          "name": "electronic-co-blog",
          "projectId": "clgkiwjd8000c08mefyco2eoo",
          "siteId": null,
          "slug": "white-black-silver",
          "status": "ACTIVE",
        },
        Object {
          "currentDeployment": null,
          "currentDeploymentId": null,
          "id": "clje32iwx000008js9rjb5uoo",
          "invokeUrl": "green-gold-silver.functions.af-cloud.app",
          "name": "electronic-co-videos",
          "projectId": "clgkiwjd8000c08mefyco2eoo",
          "siteId": null,
          "slug": "green-gold-silver",
          "status": "ACTIVE",
        },
        Object {
          "currentDeployment": Object {
            "cid": "bafybeifyvm5aa2z35jnpehvg3hfflazesjfma53yekmhz7dckqn4buvr7q",
          },
          "currentDeploymentId": "clgmajsoo000108moef7f1yt0",
          "id": "clgma7ilu000008jzdlwhb76a",
          "invokeUrl": "blue-green-yellow.functions.af-cloud.app",
          "name": "electronic-co-shop",
          "projectId": "clgkiwjd8000c08mefyco2eoo",
          "siteId": null,
          "slug": "blue-green-yellow",
          "status": "ACTIVE",
        },
        Object {
          "currentDeployment": null,
          "currentDeploymentId": null,
          "id": "clm93utuz000108laem2a4pe4",
          "invokeUrl": "blue-gold-yellow.functions.af-cloud.app",
          "name": "electronic-co-deprecated",
          "projectId": "clgkiwjd8000c08mefyco2eoo",
          "siteId": null,
          "slug": "blue-gold-yellow",
          "status": "ACTIVE",
        },
      ]
    `);
  });

  it('should create function', async () => {
    const response = await sdk.functions().create({
      name: 'new-function',
    });

    expect(response).toMatchInlineSnapshot(
      { id: expect.any(String) },
      `
      Object {
        "currentDeployment": null,
        "currentDeploymentId": null,
        "id": Any<String>,
        "invokeUrl": "https://crooked-bland-jackal.dev.on-fleek-functions.app",
        "name": "new-function",
        "projectId": "clgkiwjd8000c08mefyco2eoo",
        "siteId": null,
        "slug": "crooked-bland-jackal",
        "status": "ACTIVE",
      }
    `
    );
  });

  it('should delete function', async () => {
    const response = await sdk.functions().delete({
      id: state.fleekFunctions.fleekFunction.electronicCoVideos.id,
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "currentDeployment": null,
        "currentDeploymentId": null,
        "id": "clje32iwx000008js9rjb5uoo",
        "invokeUrl": "green-gold-silver.functions.af-cloud.app",
        "name": "electronic-co-videos",
        "projectId": "clgkiwjd8000c08mefyco2eoo",
        "siteId": null,
        "slug": "green-gold-silver",
        "status": "ACTIVE",
      }
    `);
  });
});
