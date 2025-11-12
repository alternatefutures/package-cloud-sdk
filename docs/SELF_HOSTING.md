# Self-Hosting Guide

This guide explains how to self-host the infrastructure needed to use the Alternate Futures SDK independently, maximizing your privacy and censorship resistance.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [IPFS Node Setup](#ipfs-node-setup)
- [Custom Gateway Configuration](#custom-gateway-configuration)
- [Arweave Integration](#arweave-integration)
- [GraphQL API (Optional)](#graphql-api-optional)
- [DNS Configuration](#dns-configuration)
- [Monitoring and Maintenance](#monitoring-and-maintenance)
- [Security Hardening](#security-hardening)

## Overview

### What Can Be Self-Hosted?

| Component | Self-Hostable | Benefit |
|-----------|---------------|---------|
| IPFS Node | ✅ Yes | Full control over content storage |
| IPFS Gateway | ✅ Yes | Private content access |
| Arweave Node | ✅ Yes | Independent permanent storage |
| Custom Domains | ✅ Yes | Decentralized DNS alternatives |
| GraphQL API | ⚠️  Complex | Requires backend infrastructure |

### Why Self-Host?

1. **Maximum Privacy**: No dependency on third-party services
2. **Censorship Resistance**: Content remains accessible even if Alternate Futures is blocked
3. **Performance**: Optimized routing in your region
4. **Control**: Full ownership of infrastructure
5. **Reliability**: No single point of failure

## Architecture

### Minimal Self-Hosted Setup

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Application                          │
│               (Using Alternate Futures SDK)                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│         Self-Hosted IPFS Node + Gateway                      │
│                                                               │
│  ┌──────────────────┐         ┌──────────────────┐          │
│  │   IPFS Daemon    │◄───────►│   HTTP Gateway   │          │
│  │   (Port 5001)    │         │   (Port 8080)    │          │
│  └──────────────────┘         └──────────────────┘          │
│           │                            │                     │
│           │                            │                     │
│           ▼                            ▼                     │
│  ┌──────────────────────────────────────────────┐           │
│  │         Local Storage (Pinned Content)       │           │
│  └──────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
                     │
                     ▼
            IPFS Global Network
```

### Full Self-Hosted Setup

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Application                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Load Balancer (nginx/caddy)                     │
│                   (SSL Termination)                          │
└───┬──────────────────────┬──────────────────────────────────┘
    │                      │
    ▼                      ▼
┌──────────┐         ┌──────────────┐
│   IPFS   │         │   Arweave    │
│  Gateway │         │   Gateway    │
│          │         │              │
│ :8080    │         │ :3000        │
└────┬─────┘         └──────┬───────┘
     │                      │
     ▼                      ▼
┌──────────┐         ┌──────────────┐
│   IPFS   │         │   Arweave    │
│  Daemon  │         │     Node     │
│          │         │              │
│ :5001    │         │ :1984        │
└──────────┘         └──────────────┘
```

## IPFS Node Setup

### Option 1: Docker (Recommended)

#### 1. Pull IPFS Image

```bash
docker pull ipfs/kubo:latest
```

#### 2. Initialize IPFS Repository

```bash
docker run -d --name ipfs_host \
  -v /path/to/ipfs/data:/data/ipfs \
  -v /path/to/ipfs/staging:/export \
  -p 4001:4001 \
  -p 4001:4001/udp \
  -p 127.0.0.1:8080:8080 \
  -p 127.0.0.1:5001:5001 \
  ipfs/kubo:latest
```

Port breakdown:
- **4001**: P2P swarm port (required for IPFS network)
- **5001**: API port (local access only)
- **8080**: Gateway port (HTTP access)

#### 3. Configure IPFS

```bash
# Enter container
docker exec -it ipfs_host sh

# Configure API access
ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001

# Configure gateway
ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/8080

# Enable garbage collection
ipfs config --json Datastore.GCPeriod '"1h"'

# Optimize for server
ipfs config profile apply server

# Exit container
exit
```

#### 4. Restart Container

```bash
docker restart ipfs_host
```

### Option 2: Native Installation

#### 1. Download IPFS

```bash
# Linux
wget https://dist.ipfs.tech/kubo/v0.25.0/kubo_v0.25.0_linux-amd64.tar.gz
tar -xvzf kubo_v0.25.0_linux-amd64.tar.gz
cd kubo
sudo bash install.sh

# macOS
brew install ipfs
```

#### 2. Initialize

```bash
ipfs init

# Configure
ipfs config Addresses.Gateway /ip4/0.0.0.0/tcp/8080
ipfs config Addresses.API /ip4/127.0.0.1/tcp/5001
ipfs config profile apply server
```

#### 3. Run as Service

Create systemd service file `/etc/systemd/system/ipfs.service`:

```ini
[Unit]
Description=IPFS Daemon
After=network.target

[Service]
Type=simple
User=ipfs
ExecStart=/usr/local/bin/ipfs daemon
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable ipfs
sudo systemctl start ipfs
```

### Verify Installation

```bash
# Check status
ipfs id

# Test gateway
curl http://localhost:8080/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG/readme

# Test API
curl -X POST http://localhost:5001/api/v0/id
```

## Custom Gateway Configuration

### SDK Configuration

Update your SDK to use your self-hosted gateway:

```typescript
import { AlternateFuturesSdk } from '@alternatefutures/sdk/node';

const sdk = new AlternateFuturesSdk({
  personalAccessToken: process.env.AF_TOKEN,
  ipfs: {
    gatewayUrl: 'http://localhost:8080',  // Your gateway
    apiUrl: 'http://localhost:5001'       // Your API
  }
});

// Upload to your node
const cid = await sdk.ipfs().add('./my-file.txt');
console.log(`Uploaded: ipfs://${cid}`);

// Retrieve from your node
const content = await sdk.ipfs().cat(cid);
```

### Multiple Gateway Fallbacks

```typescript
const sdk = new AlternateFuturesSdk({
  personalAccessToken: process.env.AF_TOKEN,
  ipfs: {
    gateways: [
      'http://localhost:8080',                    // Your primary
      'https://ipfs.alternatefutures.ai',         // AF fallback
      'https://ipfs.io',                          // Public fallback
    ]
  }
});
```

### Environment-Based Configuration

```bash
# .env
IPFS_GATEWAY_URL=http://localhost:8080
IPFS_API_URL=http://localhost:5001
AF_TOKEN=your-token-here
```

```typescript
const sdk = new AlternateFuturesSdk({
  personalAccessToken: process.env.AF_TOKEN,
  ipfs: {
    gatewayUrl: process.env.IPFS_GATEWAY_URL,
    apiUrl: process.env.IPFS_API_URL
  }
});
```

## Arweave Integration

### Option 1: Public Gateway (Easiest)

Use public Arweave gateways without running a node:

```typescript
const sdk = new AlternateFuturesSdk({
  personalAccessToken: process.env.AF_TOKEN,
  arweave: {
    gatewayUrl: 'https://arweave.net'  // Public gateway
  }
});
```

### Option 2: Self-Hosted Arweave Node

⚠️ **Warning**: Arweave nodes require significant resources (2TB+ storage, 16GB+ RAM)

#### 1. Install Arweave

```bash
# Download latest release
wget https://github.com/ArweaveTeam/arweave/releases/download/N.2.7.3/arweave-2.7.3-x86_64-linux.tar.gz

# Extract
tar -xzf arweave-2.7.3-x86_64-linux.tar.gz
cd arweave

# Generate wallet
./arweave-server wallet create

# Start node
./arweave-server start
```

#### 2. Configure SDK

```typescript
const sdk = new AlternateFuturesSdk({
  personalAccessToken: process.env.AF_TOKEN,
  arweave: {
    gatewayUrl: 'http://localhost:1984',  // Your node
    walletPath: '/path/to/arweave-keyfile.json'
  }
});
```

## GraphQL API (Optional)

⚠️ **Advanced**: Self-hosting the GraphQL API requires significant infrastructure

The Alternate Futures GraphQL API is part of our backend services. For most use cases, continue using our hosted API while self-hosting storage layers (IPFS/Arweave).

### When to Self-Host GraphQL

- You need complete independence from Alternate Futures
- You're building a fork or alternative service
- You have strict data sovereignty requirements

### Alternative: Minimal Metadata Storage

Instead of self-hosting the full API, store metadata locally:

```typescript
// Local metadata store
const metadata = {
  sites: {
    'site-1': {
      name: 'My Site',
      latestDeployment: 'QmXyz...',
      domain: 'example.com'
    }
  }
};

// Use SDK for storage only
const cid = await sdk.ipfs().add('./dist');

// Update local metadata
metadata.sites['site-1'].latestDeployment = cid;
fs.writeFileSync('metadata.json', JSON.stringify(metadata));
```

## DNS Configuration

### Option 1: ENS (Ethereum Name Service)

Completely decentralized DNS using Ethereum:

#### 1. Register ENS Name

Visit [app.ens.domains](https://app.ens.domains) and register a `.eth` name.

#### 2. Set Content Hash

```bash
# Using ENS CLI
ens-cli set-content yourname.eth ipfs://QmYourCID...

# Or via web interface
```

#### 3. SDK Configuration

```typescript
const domain = await sdk.domains().createCustomDomain({
  siteId: 'site-123',
  hostname: 'yourname.eth',
  domainType: 'ENS'
});
```

Users can now access your site at `yourname.eth` using ENS-compatible browsers.

### Option 2: Traditional DNS

Point your domain to your self-hosted gateway:

```
A     example.com        → YOUR_IPFS_GATEWAY_IP
AAAA  example.com        → YOUR_IPV6_ADDRESS
TXT   _dnslink.example.com → dnslink=/ipfs/QmYourCID...
```

### Option 3: Handshake (HNS)

Decentralized top-level domain alternative:

```bash
# Register via Handshake
hsd-cli rpc sendopen yourname
hsd-cli rpc sendbid yourname 1000 1000

# Set records
hsd-cli rpc sendupdate yourname \
  '{"records":[{"type":"TXT","txt":["dnslink=/ipfs/QmYourCID"]}]}'
```

## Monitoring and Maintenance

### IPFS Health Checks

```bash
#!/bin/bash
# ipfs-health.sh

# Check daemon
if ! ipfs id > /dev/null 2>&1; then
  echo "IPFS daemon is down!"
  systemctl restart ipfs
fi

# Check peers
PEERS=$(ipfs swarm peers | wc -l)
if [ $PEERS -lt 5 ]; then
  echo "Warning: Low peer count ($PEERS)"
fi

# Check storage
USAGE=$(df -h /path/to/ipfs/data | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $USAGE -gt 90 ]; then
  echo "Warning: Disk usage at ${USAGE}%"
  ipfs repo gc
fi
```

Schedule with cron:

```bash
*/5 * * * * /path/to/ipfs-health.sh
```

### Garbage Collection

IPFS stores all fetched content. Periodically clean up:

```bash
# Manual GC
ipfs repo gc

# Automatic GC (in config)
ipfs config --json Datastore.GCPeriod '"1h"'
```

### Pin Management

Pin important content to prevent garbage collection:

```bash
# Pin specific CID
ipfs pin add QmYourCID

# List pinned content
ipfs pin ls --type=recursive

# Unpin
ipfs pin rm QmYourCID
```

### Metrics and Monitoring

Use Prometheus + Grafana:

```bash
# Enable metrics in IPFS
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST"]'

# Scrape metrics
curl http://localhost:5001/debug/metrics/prometheus
```

## Security Hardening

### 1. Firewall Configuration

```bash
# Allow IPFS swarm (P2P)
ufw allow 4001/tcp
ufw allow 4001/udp

# Deny direct API access
ufw deny 5001/tcp

# Allow gateway (if public)
ufw allow 8080/tcp

# Or use nginx reverse proxy with SSL
ufw allow 443/tcp
```

### 2. API Access Control

Never expose IPFS API publicly. Use nginx reverse proxy with authentication:

```nginx
server {
    listen 443 ssl;
    server_name ipfs-api.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        auth_basic "IPFS API";
        auth_basic_user_file /etc/nginx/.htpasswd;

        proxy_pass http://127.0.0.1:5001;
        proxy_set_header Host $host;
    }
}
```

### 3. Gateway Rate Limiting

Prevent abuse of your public gateway:

```nginx
http {
    limit_req_zone $binary_remote_addr zone=ipfs_limit:10m rate=10r/s;

    server {
        listen 8080;
        server_name ipfs-gateway.yourdomain.com;

        location / {
            limit_req zone=ipfs_limit burst=20 nodelay;
            proxy_pass http://127.0.0.1:8080;
        }
    }
}
```

### 4. Content Filtering (Optional)

Block malicious content:

```bash
# Add to IPFS blocklist
ipfs block put /path/to/blocklist.txt

# Block specific CID
ipfs refs QmBadCID --recursive | xargs -n1 ipfs block rm
```

### 5. Regular Updates

Keep IPFS updated:

```bash
# Check version
ipfs version

# Update (Docker)
docker pull ipfs/kubo:latest
docker restart ipfs_host

# Update (Native)
ipfs update install latest
systemctl restart ipfs
```

## Troubleshooting

### Issue: Low Peer Count

```bash
# Check peers
ipfs swarm peers

# Connect to bootstrappers
ipfs bootstrap add /dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN

# Check firewall
sudo ufw status
```

### Issue: Slow Content Retrieval

```bash
# Check if content is pinned
ipfs pin ls | grep QmYourCID

# Manually provide content
ipfs refs local | xargs -n1 ipfs dht provide
```

### Issue: High Disk Usage

```bash
# Check repo size
ipfs repo stat

# Run garbage collection
ipfs repo gc

# Set storage limit
ipfs config Datastore.StorageMax 100GB
```

## Cost Estimates

### Minimal Setup

- **Cloud VPS**: $5-10/month (DigitalOcean, Vultr, Linode)
- **Storage**: 50GB-100GB SSD
- **Bandwidth**: 1TB/month
- **Maintenance**: 1-2 hours/month

### Production Setup

- **Cloud VPS**: $20-50/month (larger instance)
- **Storage**: 500GB-1TB SSD
- **Bandwidth**: 5TB/month
- **Monitoring**: Prometheus + Grafana ($5/month)
- **Maintenance**: 4-8 hours/month

## Resources

- [IPFS Documentation](https://docs.ipfs.tech/)
- [IPFS Cluster](https://ipfscluster.io/) - Coordinate multiple IPFS nodes
- [Arweave Docs](https://docs.arweave.org/)
- [ENS Documentation](https://docs.ens.domains/)
- [Handshake Documentation](https://handshake.org/)

## Community Support

- [IPFS Discord](https://discord.gg/ipfs)
- [Arweave Discord](https://discord.gg/arweave)
- [Alternate Futures Discord](#) (coming soon)

---

**Need Help?** Contact support@alternatefutures.ai or create a GitHub discussion.

**Last Updated**: 2024-11-12
