# Architecture Overview

This document provides a comprehensive overview of the Alternate Futures SDK architecture, with special focus on our censorship-resistance and privacy-first design principles.

## Table of Contents

- [High-Level Architecture](#high-level-architecture)
- [Core Components](#core-components)
- [Censorship Resistance Strategy](#censorship-resistance-strategy)
- [Privacy Architecture](#privacy-architecture)
- [Data Flow](#data-flow)
- [Security Model](#security-model)
- [Performance Considerations](#performance-considerations)

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       User Application                       │
│                  (Browser or Node.js)                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Alternate Futures SDK                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Clients    │  │   Services   │  │   Utils      │      │
│  │              │  │              │  │              │      │
│  │ - Sites      │  │ - Auth       │  │ - Crypto     │      │
│  │ - Domains    │  │ - Storage    │  │ - Validation │      │
│  │ - Functions  │  │ - Upload     │  │ - Retry      │      │
│  │ - Billing    │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Multi-Gateway Layer                             │
│                (Failover & Load Balancing)                   │
└────┬──────────────────────┬──────────────────────┬──────────┘
     │                      │                      │
     ▼                      ▼                      ▼
┌──────────┐         ┌──────────┐         ┌──────────┐
│ GraphQL  │         │   IPFS   │         │ Arweave  │
│ Gateway  │         │ Gateways │         │ Gateways │
│          │         │          │         │          │
│ Primary  │         │ Primary  │         │ Primary  │
│ Failover │         │ Public   │         │ Public   │
│          │         │ Custom   │         │          │
└──────────┘         └──────────┘         └──────────┘
     │                      │                      │
     ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────┐
│           Decentralized Storage & Services                   │
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   GraphQL    │    │     IPFS     │    │   Arweave    │  │
│  │     API      │    │   Network    │    │   Network    │  │
│  │              │    │              │    │              │  │
│  │ - Metadata   │    │ - Content    │    │ - Permanent  │  │
│  │ - Config     │    │ - Mutable    │    │ - Immutable  │  │
│  │ - DNS        │    │ - Pinning    │    │ - Archive    │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Client Layer

**Purpose**: Provides high-level API for interacting with Alternate Futures services.

**Key Clients**:
- `SitesClient`: Manage static sites and deployments
- `DomainsClient`: Configure DNS, SSL, custom domains
- `FunctionsClient`: Deploy and manage serverless functions
- `ApplicationsClient`: Application lifecycle management
- `BillingClient`: Usage tracking and billing
- `IpfsClient`: Direct IPFS interactions

**Design Principles**:
- Consistent API surface across all clients
- TypeScript-first with full type safety
- Automatic retries with exponential backoff
- Comprehensive error handling

**Example**:
```typescript
const sdk = new AlternateFuturesSdk({
  personalAccessToken: process.env.AF_TOKEN
});

// Type-safe, consistent API
const site = await sdk.sites().create({ name: "My Site" });
const domain = await sdk.domains().createCustomDomain({
  siteId: site.id,
  hostname: "example.com"
});
```

### 2. Service Layer

**Purpose**: Encapsulates business logic and protocol interactions.

**Key Services**:

#### Authentication Service
- Token management and refresh
- Session handling
- Scope-based permissions

#### Storage Service
- Multi-gateway routing
- Upload chunking and resumption
- Content deduplication via CID
- Pinning and garbage collection

#### Upload Service
- Multipart uploads for large files
- Progress tracking
- Integrity verification
- CAR file generation

**Design Principles**:
- Single responsibility
- Dependency injection
- Testable with mocks
- Protocol-agnostic interfaces

### 3. Utilities Layer

**Purpose**: Reusable cross-cutting concerns.

**Key Utilities**:
- **Retry Logic**: Exponential backoff with jitter
- **Validation**: Input sanitization and schema validation
- **Crypto**: CID generation, hashing, signing
- **Formatting**: Data transformation and normalization

## Censorship Resistance Strategy

### Multi-Gateway Architecture

The SDK implements a multi-gateway strategy to ensure content remains accessible even if specific gateways are blocked or compromised.

#### Gateway Hierarchy

1. **Primary Gateways** (Alternate Futures operated)
   - Optimized performance
   - Enhanced privacy
   - Custom caching

2. **Public Gateways** (Community operated)
   - IPFS: ipfs.io, dweb.link, cloudflare-ipfs.com
   - Arweave: arweave.net, ar.io

3. **Custom Gateways** (User operated)
   - Self-hosted IPFS nodes
   - Private infrastructure
   - Geographic distribution

#### Failover Logic

```typescript
class MultiGatewayFetcher {
  async fetch(cid: string): Promise<Response> {
    const gateways = [
      'https://ipfs.alternatefutures.ai',    // Primary
      'https://ipfs.io',                      // Public fallback
      'https://dweb.link',                    // Public fallback
      ...this.customGateways                  // User-provided
    ];

    for (const gateway of gateways) {
      try {
        const response = await this.attemptFetch(gateway, cid);
        if (response.ok) return response;
      } catch (error) {
        // Log and continue to next gateway
        continue;
      }
    }

    throw new Error('All gateways failed');
  }
}
```

#### Benefits

- **No Single Point of Failure**: Content accessible via multiple routes
- **Geographic Diversity**: Gateways in multiple jurisdictions
- **Protocol Diversity**: IPFS, Arweave, HTTP gateways
- **User Control**: Add custom gateways for specific needs

### Content Addressing

All content is addressed by cryptographic hash (CID), not by domain or IP:

```
Traditional:  https://example.com/file.jpg
              ↓ (Can be censored at DNS or IP level)

Content-Addressed:  ipfs://QmXyz.../file.jpg
                    ↓ (Content is verifiable, location-independent)
```

**Benefits**:
- DNS censorship ineffective
- Content integrity verifiable
- Location-independent
- Peer-to-peer distribution

### Protocol Diversity

Support for multiple decentralized protocols:

1. **IPFS** (InterPlanetary File System)
   - Mutable via IPNS
   - DHT-based discovery
   - Peer-to-peer sharing

2. **Arweave**
   - Permanent storage
   - Immutable records
   - Pay-once, store forever

3. **Web3 Domains**
   - ENS (Ethereum Name Service)
   - ARNS (Arweave Name System)
   - IPNS (InterPlanetary Name System)

### Decentralized DNS

Custom domain support with decentralized alternatives:

```typescript
// Traditional DNS
const domain = await sdk.domains().createCustomDomain({
  hostname: "example.com",    // Can be censored
  verificationMethod: "TXT"
});

// Decentralized DNS
const domain = await sdk.domains().createCustomDomain({
  hostname: "mysite.eth",     // Uncensorable via ENS
  domainType: "ENS"
});
```

## Privacy Architecture

### Zero-Knowledge Design

The SDK is designed such that Alternate Futures cannot see your content:

1. **Client-Side Encryption** (optional)
   ```typescript
   const encrypted = await encryptContent(data, userKey);
   await sdk.ipfs().add(encrypted);
   // Alternate Futures sees only encrypted blobs
   ```

2. **End-to-End Hashing**
   - CID generated client-side
   - Content verified client-side
   - No intermediate inspection

3. **No Content Scanning**
   - Content stored as-is
   - No AI scanning
   - No keyword filtering

### No Telemetry

The SDK collects **zero** usage analytics:

```typescript
// ❌ NOT in our SDK
trackEvent('user_uploaded_file');
analytics.send('deployment_created');
sentry.captureException(error);

// ✓ What we do instead
// Nothing. Your usage is private.
```

### Minimal Data Collection

Only data explicitly sent via API calls:

| Data Type | Collected | Purpose |
|-----------|-----------|---------|
| Content | Yes (you upload it) | Storage |
| Metadata | Yes (project config) | Service operation |
| IP Address | Temporary (logs) | Security, debugging |
| Usage Analytics | **No** | N/A |
| Error Reports | **No** | N/A |
| Telemetry | **No** | N/A |

### Local-First Operations

Where possible, operations happen locally:

```typescript
// CID generation happens locally
const cid = await calculateCID(file);

// Validation happens locally
if (!isValidHostname(domain)) {
  throw new Error('Invalid hostname');
}

// No "phone home" for functionality
```

### Transparent Data Handling

All API calls are explicit:

```typescript
// You can see exactly what is sent
const response = await graphqlClient.mutation({
  __name: 'CreateSite',
  createSite: {
    __args: {
      input: {
        name: "My Site",
        // Only what you provide
      }
    },
    id: true,
    name: true,
    // Only what you request
  }
});
```

## Data Flow

### Upload Flow

```
1. User prepares content
   ↓
2. SDK chunks file (if large)
   ↓
3. SDK calculates CID locally
   ↓
4. SDK checks for existing CID (deduplication)
   ↓
5. SDK uploads to IPFS gateway
   ↓
6. Gateway pins content
   ↓
7. SDK confirms CID matches
   ↓
8. SDK updates metadata via GraphQL
   ↓
9. Content is now accessible via:
   - Primary gateway
   - Public gateways
   - IPFS network
   - Custom gateways
```

### Retrieval Flow

```
1. User requests content by CID
   ↓
2. SDK tries primary gateway
   ↓
3. If fails, tries public gateways
   ↓
4. If fails, tries custom gateways
   ↓
5. If fails, tries direct IPFS network
   ↓
6. Content returned and verified
   ↓
7. User receives content
```

### Domain Resolution Flow

```
1. User visits example.com
   ↓
2. DNS resolves to Alternate Futures edge
   ↓
3. Edge looks up site metadata
   ↓
4. Edge fetches latest CID
   ↓
5. Edge retrieves content from IPFS
   ↓
6. Edge serves content with SSL
   ↓
7. Content cached at edge

Decentralized alternative:
1. User visits mysite.eth
   ↓
2. Browser queries ENS contract
   ↓
3. ENS returns IPFS CID
   ↓
4. Browser fetches from IPFS gateway
   ↓
5. Content served directly
```

## Security Model

### Authentication

- **Personal Access Tokens**: Long-lived, scope-limited
- **No Passwords**: SDK never handles passwords
- **Token Rotation**: Encourage regular rotation
- **Principle of Least Privilege**: Request minimal scopes

### Authorization

- Project-based isolation
- Scope-based permissions
- No cross-project access
- Audit logs (server-side)

### Input Validation

All inputs validated before API calls:

```typescript
export function validateHostname(hostname: string): boolean {
  // Prevent injection attacks
  if (!/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i.test(hostname)) {
    return false;
  }
  return true;
}
```

### Content Integrity

- CID verification on upload
- CID verification on download
- Tamper-evident logs
- Cryptographic proofs

### Transport Security

- HTTPS only (TLS 1.2+)
- Certificate pinning (optional)
- No insecure fallbacks

## Performance Considerations

### Caching Strategy

1. **Local Cache**: In-memory cache for repeated calls
2. **Gateway Cache**: CDN caching at edge
3. **IPFS Cache**: DHT and local node cache

### Lazy Loading

```typescript
// Don't load all content upfront
const site = await sdk.sites().get(siteId);

// Lazy load deployments only when needed
const deployments = await sdk.sites().listDeployments(siteId);
```

### Batching

```typescript
// Batch multiple uploads
const cids = await Promise.all([
  sdk.ipfs().add(file1),
  sdk.ipfs().add(file2),
  sdk.ipfs().add(file3),
]);
```

### Chunking

Large files automatically chunked:

```
File > 100MB
  ↓
Split into 10MB chunks
  ↓
Parallel upload
  ↓
Combine on server
```

## Extensibility

### Plugin Architecture (Future)

```typescript
sdk.use(customGatewayPlugin({
  gateways: ['https://my-ipfs-node.local']
}));

sdk.use(encryptionPlugin({
  key: userEncryptionKey
}));
```

### Custom Transports

```typescript
const sdk = new AlternateFuturesSdk({
  transport: customHttpTransport({
    proxy: 'socks5://localhost:9050',  // Tor
  })
});
```

## Testing Architecture

### Mock Service Workers

All API calls mocked for testing:

```typescript
// Deterministic tests
const handlers = [
  localhost.query('GetSite', ({ variables }) => {
    return HttpResponse.json({
      data: { site: mockSite }
    });
  })
];
```

### Fixtures

Reusable test data:

```typescript
export const mockDomain = {
  id: 'domain-123',
  hostname: 'example.com',
  verified: true,
  // ...
};
```

## Future Enhancements

1. **Peer-to-Peer SDK**: Direct browser-to-browser via WebRTC
2. **Onion Routing**: Built-in Tor support
3. **Encrypted Metadata**: Zero-knowledge metadata
4. **Decentralized Identity**: DID-based auth
5. **Verifiable Builds**: Reproducible SDK builds

## References

- [IPFS Specification](https://docs.ipfs.tech/)
- [Arweave Yellow Paper](https://www.arweave.org/yellow-paper.pdf)
- [ENS Documentation](https://docs.ens.domains/)
- [Web3 Storage](https://web3.storage/docs/)

---

**Last Updated**: 2024-11-12
