import { SdkRequiredNodeRuntimeError } from '@alternatefutures/errors';

import { isNode } from '../utils/node';

export const requireNodeEnv = () => {
  if (isNode) {
    return;
  }

  throw new SdkRequiredNodeRuntimeError();
};
