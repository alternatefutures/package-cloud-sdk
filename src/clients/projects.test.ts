import { describe, expect, it, afterAll, afterEach, beforeAll } from 'vitest';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { server } from '../mocks/graphql/node';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl } from '../mocks/graphql/handlers';
import { AlternateFuturesSdk } from '../AlternateFuturesSdk';
import state from '../mocks/state';

describe('Projects', () => {
  const sdk = new AlternateFuturesSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should create project', async () => {
    const response = await sdk.projects().create({ name: 'new-project' });

    expect(response).toMatchInlineSnapshot(
      { createdAt: expect.anything(), id: expect.any(String) },
      `
      Object {
        "avatar": null,
        "backupStorageOnArweave": false,
        "backupStorageOnFilecoin": true,
        "createdAt": Anything,
        "id": Any<String>,
        "name": "new-project",
      }
    `,
    );
  });

  it.todo('should update project', async (context) => {
    const testImage = await readFile(
      join(__dirname, '../../assets/test-image.png'),
    );

    const response = await sdk.projects().update({
      where: { id: state.auth.project.electronicCo.id },
      data: {
        name: 'renamed-project',
        avatar: new File([testImage], 'logo'),
        backupStorageOnArweave: true,
        backupStorageOnFilecoin: true,
      },
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "avatar": "https://secret-asset-url/cid?token=eyJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJRbVNOWHVIckpIUW03QTNlbjh5YjR6ZHZwWGdDYzFVRVc3Z1FVSFM5dmRnWEYxIiwiZXhwIjoxNzI3Nzk3OTA3fQ.UBUUQ2sk0-b60SbyoAKOXsFSgOJ_uJh_IA85-V9JU2E",
        "backupStorageOnArweave": true,
        "backupStorageOnFilecoin": true,
        "createdAt": "2023-03-23T08:05:13.641Z",
        "id": "clgkiwjd8000c08mefyco2eoo",
        "name": "renamed-project",
      }
    `);
  });

  it('should get project', async () => {
    const response = await sdk
      .projects()
      .get({ id: state.auth.project.electronicCo.id });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "avatar": null,
        "backupStorageOnArweave": false,
        "backupStorageOnFilecoin": false,
        "createdAt": "2023-03-23T08:05:13.641Z",
        "id": "clgkiwjd8000c08mefyco2eoo",
        "name": "electronicCo",
      }
    `);
  });

  it('should list projects', async () => {
    const response = await sdk.projects().list();

    expect(response).toMatchInlineSnapshot(
      `
      Array [
        Object {
          "avatar": null,
          "backupStorageOnArweave": false,
          "backupStorageOnFilecoin": false,
          "createdAt": "2024-01-04T12:05:13.641Z",
          "id": "clt5ter6y000008jxd9lp8vez",
          "name": "dreamTeam",
        },
        Object {
          "avatar": null,
          "backupStorageOnArweave": false,
          "backupStorageOnFilecoin": false,
          "createdAt": "2023-03-23T08:05:13.641Z",
          "id": "clgkiwjd8000c08mefyco2eoo",
          "name": "electronicCo",
        },
        Object {
          "avatar": null,
          "backupStorageOnArweave": false,
          "backupStorageOnFilecoin": false,
          "createdAt": "2023-03-30T08:05:13.641Z",
          "id": "clgukvjww000108kw2h8n09nx",
          "name": "electronicLtd",
        },
        Object {
          "avatar": "d.png",
          "backupStorageOnArweave": false,
          "backupStorageOnFilecoin": false,
          "createdAt": "2023-03-20T08:05:13.641Z",
          "id": "clgkivku7000a08me9coi0civ",
          "name": "vegetableCo",
        },
      ]
    `,
    );
  });
});
