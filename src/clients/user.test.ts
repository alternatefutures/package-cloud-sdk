import { describe, expect, it, afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/graphql/node';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl } from '../mocks/graphql/handlers';
import { AlternateFuturesSdk } from '../AlternateFuturesSdk';
import state from '../mocks/state';

describe('User', () => {
  const sdk = new AlternateFuturesSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should list personal access tokens', async () => {
    const response = await sdk.user().listPersonalAccessTokens();

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "createdAt": "2023-03-21T08:05:13.641Z",
          "id": "clgkiwxl9000e08meh1z64f5l",
          "maskedToken": "pat_*******SuB",
          "name": "mobile",
        },
      ]
    `);
  });

  it('should delete personal access token', async () => {
    const response = await sdk.user().deletePersonalAccessToken({
      id: state.auth.personalAccessToken.joshOwnedToken.id,
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "__typename": "PersonalAccessToken",
        "createdAt": "2023-03-21T08:05:13.641Z",
        "id": "clgkiwxl9000e08meh1z64f5l",
        "maskedToken": "pat_*******SuB",
        "name": "mobile",
        "updatedAt": "2023-03-21T08:05:13.641Z",
      }
    `);
  });
});
