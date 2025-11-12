/**
 * Endpoint Failover Utility
 *
 * Provides automatic failover to backup endpoints for censorship resistance.
 * If the primary endpoint fails, automatically tries alternative endpoints.
 *
 * @module utils/failover
 */

export type FailoverEndpoint = {
  url: string;
  priority: number;
  timeout?: number;
};

export type FailoverConfig = {
  endpoints: FailoverEndpoint[];
  maxRetries?: number;
  retryDelayMs?: number;
  onFailover?: (endpoint: string, error: Error) => void;
};

export type FailoverResult<T> = {
  data: T;
  endpoint: string;
  attempts: number;
};

/**
 * Executes a function with automatic endpoint failover.
 *
 * Tries endpoints in priority order, automatically failing over to
 * backup endpoints if primary endpoints are unavailable.
 *
 * This is essential for censorship resistance - if one gateway is
 * blocked or down, content remains accessible via alternatives.
 *
 * @param fn - Function to execute with endpoint
 * @param config - Failover configuration
 * @returns Promise with result and metadata
 *
 * @example
 * ```typescript
 * const config: FailoverConfig = {
 *   endpoints: [
 *     { url: 'https://ipfs.alternatefutures.ai', priority: 1 },
 *     { url: 'https://ipfs.io', priority: 2 },
 *     { url: 'https://dweb.link', priority: 3 },
 *   ],
 *   onFailover: (endpoint, error) => {
 *     console.warn(`Endpoint ${endpoint} failed, trying next...`);
 *   }
 * };
 *
 * const result = await withFailover(
 *   async (endpoint) => fetch(`${endpoint}/ipfs/${cid}`),
 *   config
 * );
 * ```
 */
export async function withFailover<T>(
  fn: (endpoint: string) => Promise<T>,
  config: FailoverConfig,
): Promise<FailoverResult<T>> {
  const sortedEndpoints = [...config.endpoints].sort(
    (a, b) => a.priority - b.priority,
  );

  const maxRetries = config.maxRetries ?? 1;
  const retryDelayMs = config.retryDelayMs ?? 1000;

  let lastError: Error | undefined;
  let totalAttempts = 0;

  for (const endpoint of sortedEndpoints) {
    for (let retry = 0; retry < maxRetries; retry++) {
      totalAttempts++;

      try {
        const data = await executeWithTimeout(
          () => fn(endpoint.url),
          endpoint.timeout,
        );

        return {
          data,
          endpoint: endpoint.url,
          attempts: totalAttempts,
        };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Notify about failover
        if (config.onFailover) {
          config.onFailover(endpoint.url, lastError);
        }

        // Wait before retry (except on last attempt)
        if (retry < maxRetries - 1) {
          await delay(retryDelayMs);
        }
      }
    }
  }

  // All endpoints exhausted
  throw new EndpointFailoverError(
    `All endpoints failed after ${totalAttempts} attempts`,
    sortedEndpoints.map((e) => e.url),
    lastError,
  );
}

/**
 * Executes a function with timeout.
 *
 * @param fn - Function to execute
 * @param timeoutMs - Timeout in milliseconds
 * @returns Promise with result
 */
async function executeWithTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs?: number,
): Promise<T> {
  if (!timeoutMs) {
    return fn();
  }

  return Promise.race([
    fn(),
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error(`Request timeout after ${timeoutMs}ms`)),
        timeoutMs,
      ),
    ),
  ]);
}

/**
 * Delays execution for specified milliseconds.
 *
 * @param ms - Milliseconds to delay
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Error thrown when all endpoints fail.
 */
export class EndpointFailoverError extends Error {
  public readonly endpoints: string[];
  public readonly cause?: Error;

  constructor(message: string, endpoints: string[], cause?: Error) {
    super(message);
    this.name = 'EndpointFailoverError';
    this.endpoints = endpoints;
    this.cause = cause;

    // Maintains proper stack trace for where error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EndpointFailoverError);
    }
  }
}

/**
 * Default IPFS gateway endpoints with priorities.
 */
export const DEFAULT_IPFS_GATEWAYS: FailoverEndpoint[] = [
  { url: 'https://ipfs.alternatefutures.ai', priority: 1, timeout: 10000 },
  { url: 'https://ipfs.io', priority: 2, timeout: 15000 },
  { url: 'https://dweb.link', priority: 3, timeout: 15000 },
  { url: 'https://cloudflare-ipfs.com', priority: 4, timeout: 15000 },
];

/**
 * Default GraphQL API endpoints with priorities.
 */
export const DEFAULT_GRAPHQL_ENDPOINTS: FailoverEndpoint[] = [
  {
    url: 'https://graphql.service.alternatefutures.ai/graphql',
    priority: 1,
    timeout: 10000,
  },
  // Add backup GraphQL endpoints here as they become available
];

/**
 * Default Arweave gateway endpoints with priorities.
 */
export const DEFAULT_ARWEAVE_GATEWAYS: FailoverEndpoint[] = [
  { url: 'https://arweave.net', priority: 1, timeout: 15000 },
  { url: 'https://ar-io.net', priority: 2, timeout: 15000 },
];
