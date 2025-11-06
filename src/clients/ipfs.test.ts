import {
  describe,
  expect,
  it,
  afterAll,
  afterEach,
  beforeAll,
  vi,
} from 'vitest';
import { server } from '../mocks/graphql/node';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl } from '../mocks/graphql/handlers';
import { AlternateFuturesSdk } from '../AlternateFuturesSdk';

type MockFileNames = 'HelloWorld' | 'Lyrics';
type MockFiles = Record<
  MockFileNames,
  {
    path: string;
    content: Buffer;
    cid: string;
  }
>;

const mockFiles: MockFiles = {
  HelloWorld: {
    path: 'src/HelloWorld.txt',
    content: Buffer.from('Hello World!'),
    cid: 'QmWvQxTqbG2Z9HPJgG57jjwR154cKhbtJenbyYTWkjgF3e',
  },
  Lyrics: {
    path: 'Documents/random/Lyrics.txt',
    content: Buffer.from('My favourite song lyrics'),
    cid: 'QmQtQq4iofjT8vgD75G3UPF3v4caatuFw3YnU2mhn17BUf',
  },
};

const mockUploadContent = vi.fn().mockImplementation(async ({ basename }) => {
  if (basename === 'HelloWorld.txt') {
    return {
      pin: {
        cid: mockFiles.HelloWorld.cid,
        size: 100,
      },
      duplicate: false,
    };
  }

  if (basename === 'Lyrics.txt') {
    return {
      pin: {
        cid: mockFiles.HelloWorld.cid,
        size: 100,
      },
      duplicate: false,
    };
  }

  if (basename === 'src') {
    return {
      pin: {
        // TODO: Missing CID
        cid: mockFiles.HelloWorld.cid,
        size: 10000,
      },
      duplicate: false,
    };
  }
});

vi.mock('./uploadProxy', () => {
  return {
    UploadProxyClient: vi.fn().mockImplementation(() => ({
      uploadContent: mockUploadContent,
    })),
  };
});

vi.mock('@web3-storage/upload-client', () => {
  return {
    UnixFS: {
      createFileEncoderStream: vi.fn(),
      createDirectoryEncoderStream: vi.fn(),
    },
  };
});

vi.mock('files-from-path', () => {
  return {
    filesFromPaths: vi.fn(),
  };
});

vi.mock('fs', async () => {
  const actual = await vi.importActual<typeof import('fs')>('fs');
  return {
    ...actual,
    promises: {
      ...actual.promises,
      stat: vi.fn().mockResolvedValue({
        isDirectory: () => true,
        size: 1024,
      }),
    },
  };
});

describe('AlternateFuturesSDK', () => {
  const sdk = new AlternateFuturesSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should add file to ipfs', async () => {
    const { path, content } = mockFiles.HelloWorld;

    const response = await sdk.ipfs().add({
      path,
      content,
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "cid": Object {
          "code": 112,
          "hash": Uint8Array [
            18,
            32,
            127,
            131,
            177,
            101,
            127,
            241,
            252,
            83,
            185,
            45,
            193,
            129,
            72,
            161,
            214,
            93,
            252,
            45,
            75,
            31,
            163,
            214,
            119,
            40,
            74,
            221,
            210,
            0,
            18,
            109,
            144,
            105,
          ],
          "version": 0,
        },
        "path": "HelloWorld.txt",
        "size": 100,
      }
    `);
  });

  it('should add all files to ipfs', async () => {
    const { HelloWorld, Lyrics } = mockFiles;

    const response = await sdk.ipfs().addAll([HelloWorld, Lyrics]);

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "cid": Object {
            "code": 112,
            "hash": Uint8Array [
              18,
              32,
              127,
              131,
              177,
              101,
              127,
              241,
              252,
              83,
              185,
              45,
              193,
              129,
              72,
              161,
              214,
              93,
              252,
              45,
              75,
              31,
              163,
              214,
              119,
              40,
              74,
              221,
              210,
              0,
              18,
              109,
              144,
              105,
            ],
            "version": 0,
          },
          "path": "HelloWorld.txt",
          "size": 100,
        },
        Object {
          "cid": Object {
            "code": 112,
            "hash": Uint8Array [
              18,
              32,
              127,
              131,
              177,
              101,
              127,
              241,
              252,
              83,
              185,
              45,
              193,
              129,
              72,
              161,
              214,
              93,
              252,
              45,
              75,
              31,
              163,
              214,
              119,
              40,
              74,
              221,
              210,
              0,
              18,
              109,
              144,
              105,
            ],
            "version": 0,
          },
          "path": "Lyrics.txt",
          "size": 100,
        },
      ]
    `);
  });

  it('should add files by path', async () => {
    const response = await sdk.ipfs().addFromPath('./src');

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "cid": Object {
            "code": 112,
            "hash": Uint8Array [
              18,
              32,
              127,
              131,
              177,
              101,
              127,
              241,
              252,
              83,
              185,
              45,
              193,
              129,
              72,
              161,
              214,
              93,
              252,
              45,
              75,
              31,
              163,
              214,
              119,
              40,
              74,
              221,
              210,
              0,
              18,
              109,
              144,
              105,
            ],
            "version": 0,
          },
          "path": "src",
          "size": 10000,
        },
      ]
    `);
  });
});
