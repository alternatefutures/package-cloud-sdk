import { describe, expect, it, afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/graphql/node';
import { mockGraphqlServiceApiUrl as graphqlServiceApiUrl } from '../mocks/graphql/handlers';
import { AlternateFuturesSdk } from '../AlternateFuturesSdk';
import state from '../mocks/state';

const TEST_KEY =
  'k51qzi5uqu5djd7wik4gj3evcbnx2okerdrh0swusu07mu2ak1v1r3y70e7k8o';
const TEST_INPUT =
  'CjQvaXBmcy9RbVBxckVISlRleDJDUGJxTlVMQ21iU0ZKVDNib0J3QUFmTWI1VWp2WHRLakVlEkB/s3F4iHVMyA9LOFizt5N4PHiI2APD15wsMa1RXGwmugThVpUjTw+5HHwFt16TI/8AKk/1p8+26hylxMxd3wAIGAAiHjIwMjMtMDgtMDVUMDk6NDk6MjguNDk5MDAwMDAwWigNMODyh77rhc0FQkCdgM1u1AAUsdf4pE7/kNYjl438/g6Ja48Tr2evFSRc6YSMgljaKX8PpQC0JDlZqF2jiKdHRUOaxLHArPo9MW0PSosBpWNUVEwbAAs0LrfB+WBlVmFsdWVYNC9pcGZzL1FtUHFyRUhKVGV4MkNQYnFOVUxDbWJTRkpUM2JvQndBQWZNYjVVanZYdEtqRWVoU2VxdWVuY2UNaFZhbGlkaXR5WB4yMDIzLTA4LTA1VDA5OjQ5OjI4LjQ5OTAwMDAwMFpsVmFsaWRpdHlUeXBlAA==';

describe('IPNS', () => {
  const sdk = new AlternateFuturesSdk({
    graphqlServiceApiUrl,
    accessTokenService: {} as any,
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should publish IPNS name', async () => {
    const response = await sdk.ipns().publishSignedName({
      input: TEST_INPUT,
      key: TEST_KEY,
    });

    expect(response).toMatchInlineSnapshot(
      '"k51qzi5uqu5dgsc1bvsuk1x84bptdvp8cupbnnbqxpxzd629gadpci3kpcm311"',
    );
  });

  // TODO: Mocking is failing for w3name
  // for some reason
  it.todo('should get resolved IPNS name', async (context) => {
    const response = await sdk.ipns().resolveName({ name: TEST_KEY });

    expect(response).toMatchInlineSnapshot(
      '"/ipfs/QmRG4xcsmoZuXqKuPz3uVBgvo3GZ6k1kLZWhmvzuKtDr9s"',
    );
  });

  it('should publish IPNS record', async () => {
    const response = await sdk.ipns().publishRecord({
      id: state.ipns.ipnsRecord.electronicCoEshop.id,
      hash: 'QmRG4xcsmoZuXqKuPz3uVBgvo3GZ6k1kLZWhmvzuKtDr9s',
    });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "ensRecords": Array [
          Object {
            "id": "8d3ad502-ec4d-489e-858e-d112656f3511",
          },
          Object {
            "id": "clm0mhccs000108ma34jn6ed3",
          },
        ],
        "hash": "QmRG4xcsmoZuXqKuPz3uVBgvo3GZ6k1kLZWhmvzuKtDr9s",
        "id": "clgkj995t000108med7gb2w4v",
        "name": "k51qzi5uqu5dhrupvn0ru1c6el43rhimh95cuiwqy0ofo8bgomvq296b49v9r7",
      }
    `);
  });

  it('should create IPNS record', async () => {
    const response = await sdk.ipns().createRecord();

    expect(response).toMatchInlineSnapshot(
      { id: expect.any(String) },
      `
      Object {
        "ensRecords": Array [],
        "hash": null,
        "id": Any<String>,
        "name": "test-name",
      }
    `,
    );
  });

  it('should create IPNS record for site', async () => {
    const response = await sdk
      .ipns()
      .createRecordForSite({ siteId: state.sites.site.electronicCoEshop.id });

    // TODO: Investigate why the hash changed here
    expect(response).toMatchInlineSnapshot(
      { id: expect.any(String) },
      `
      Object {
        "ensRecords": Array [],
        "hash": "bafybeibtme5hmkjxsryerf6pihhfbhifwnsz7gmhnfqglg2r326m4glzva",
        "id": Any<String>,
        "name": "test-name",
      }
    `,
    );
  });

  it('should delete IPNS record', async () => {
    const response = await sdk
      .ipns()
      .deleteRecord({ id: state.ipns.ipnsRecord.electronicCoEshop.id });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "ensRecords": Array [],
        "hash": "QmcvfRw5WDutRzvRNq2matcJWW2nKWFGDbqxaaTxnWksME",
        "id": "clgkj995t000108med7gb2w4v",
        "name": "k51qzi5uqu5dhrupvn0ru1c6el43rhimh95cuiwqy0ofo8bgomvq296b49v9r7",
      }
    `);
  });

  it('should list IPNS records', async () => {
    const response = await sdk.ipns().listRecords();

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "ensRecords": Array [
            Object {
              "id": "8d3ad502-ec4d-489e-858e-d112656f3511",
            },
            Object {
              "id": "clm0mhccs000108ma34jn6ed3",
            },
          ],
          "hash": "QmcvfRw5WDutRzvRNq2matcJWW2nKWFGDbqxaaTxnWksME",
          "id": "clgkj995t000108med7gb2w4v",
          "name": "k51qzi5uqu5dhrupvn0ru1c6el43rhimh95cuiwqy0ofo8bgomvq296b49v9r7",
        },
        Object {
          "ensRecords": Array [
            Object {
              "id": "40767ba9-eb85-439b-9369-489459a9376b",
            },
          ],
          "hash": "QmX7WyiLtbvmfbUzN2eJuvmDuGZSDjavuauwaJL4bFC5SJ",
          "id": "clgkj9ipf000208me9yzre1cn",
          "name": "k51qzi5uqu5dh2c8ec00yowiapopchxdvnwh6iy2xoxc51inldruqh4yvzgez5",
        },
        Object {
          "ensRecords": Array [
            Object {
              "id": "af470cc1-08d8-4d39-be6f-b0eebc0a6480",
            },
          ],
          "hash": "QmW73w6jvat7zDpFkYHft8eB88LiU6fPyV9LUX9et7XRUy",
          "id": "clgkj9pfa000308meh73d8nff",
          "name": "k51qzi5uqu5dipwqop5kj5na30qlwqbyyn54g8y3jcm3sdc02t9tjlec2a46ci",
        },
      ]
    `);
  });

  it('should get IPNS record by name', async () => {
    const response = await sdk
      .ipns()
      .getRecord({ name: state.ipns.ipnsRecord.electronicCoEshop.name });

    expect(response).toMatchInlineSnapshot(`
      Object {
        "ensRecords": Array [
          Object {
            "id": "8d3ad502-ec4d-489e-858e-d112656f3511",
          },
          Object {
            "id": "clm0mhccs000108ma34jn6ed3",
          },
        ],
        "hash": "QmcvfRw5WDutRzvRNq2matcJWW2nKWFGDbqxaaTxnWksME",
        "id": "clgkj995t000108med7gb2w4v",
        "name": "k51qzi5uqu5dhrupvn0ru1c6el43rhimh95cuiwqy0ofo8bgomvq296b49v9r7",
      }
    `);
  });
});
