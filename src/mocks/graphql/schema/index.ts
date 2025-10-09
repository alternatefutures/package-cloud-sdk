import { readFileSync } from 'fs';
import { join } from 'path';

export const schemaStr = readFileSync(
  join(
    __dirname,
    '../../../../',
    'node_modules',
    '@alternatefutures/utils-genql-client',
    'schema.graphql',
  ),
  'utf-8',
).toString();
