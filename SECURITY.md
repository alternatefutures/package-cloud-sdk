# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of the Alternate Futures SDK seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do Not Disclose Publicly

Please do not create a public GitHub issue for security vulnerabilities. This helps protect users while we work on a fix.

### 2. Report via Email

Send details to: **security@alternatefutures.ai**

Include in your report:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)
- Your contact information

### 3. Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 1-7 days
  - High: 7-14 days
  - Medium: 14-30 days
  - Low: 30-90 days

### 4. Disclosure Policy

- We will coordinate disclosure with you
- Credit will be given to reporters (unless you prefer anonymity)
- Public disclosure after fix is deployed and users have time to update

## Security Best Practices

When using this SDK:

1. **Keep Dependencies Updated**: Regularly update to the latest version
2. **Secure Token Storage**: Never commit tokens to version control
3. **Use Environment Variables**: Store sensitive data in `.env` files
4. **Review Permissions**: Use minimal necessary permissions for access tokens
5. **Monitor Dependencies**: Watch for security advisories on dependencies

## Security Features

This SDK implements several security features:

- **No Telemetry**: We collect no analytics or usage data
- **Minimal Dependencies**: Reduced attack surface
- **Type Safety**: TypeScript for compile-time safety
- **Input Validation**: All inputs validated before API calls
- **Secure Defaults**: HTTPS-only, secure configurations by default

## Known Security Considerations

### Access Tokens

Personal Access Tokens provide full account access. Treat them like passwords:
- Rotate regularly
- Use separate tokens for different applications
- Revoke immediately if compromised

### Client-Side Usage

When using the browser version:
- Never expose tokens in client-side code
- Use backend proxies for sensitive operations
- Implement proper CORS policies

## Bug Bounty

We currently do not have a formal bug bounty program, but we appreciate responsible disclosure and will acknowledge contributors in our security hall of fame.

## Contact

For security-related questions: security@alternatefutures.ai
For general support: support@alternatefutures.ai
