import { CID } from 'multiformats/cid';
import { sha256 } from 'multiformats/hashes/sha2';

async function textToCidV0(text: string): Promise<string> {
  const textEncoder = new TextEncoder();
  const bytes = textEncoder.encode(text);

  const hash = await sha256.digest(bytes);

  const cid = CID.createV0(hash);

  return cid.toString();
}

const text = process.argv[2];

if (!text) {
  console.error('👹 Oops! Please provide some text/content');
  process.exit(1);
}

textToCidV0(text).then(cidString => {
  console.log('✅ CIDv0:', cidString);
}).catch(error => {
  console.error('👹 Oops! found error:', error);
  process.exit(1);
});
