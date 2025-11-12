# Contributing to Alternate Futures SDK

Thank you for considering contributing to the Alternate Futures SDK! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **pnpm**: v8 or higher (required for development)
- **Git**: For version control
- **TypeScript**: Familiarity recommended

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/package-cloud-sdk.git
   cd package-cloud-sdk
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/alternatefutures/package-cloud-sdk.git
   ```

## Development Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Create environment file:
   ```bash
   touch .env.production
   ```

3. Add required environment variables:
   ```bash
   SDK__AUTH_APPS_URL="https://auth-apps.service.alternatefutures.ai"
   SDK__IPFS__STORAGE_API_URL="https://storage-ipfs.service.alternatefutures.ai"
   SDK__GRAPHQL_API_URL="https://graphql.service.alternatefutures.ai/graphql"
   SDK__UPLOAD_PROXY_API_URL="https://uploads.service.alternatefutures.ai"
   ```

4. Run tests to verify setup:
   ```bash
   pnpm test
   ```

## How to Contribute

### Types of Contributions

We welcome:
- Bug fixes
- New features
- Documentation improvements
- Test coverage improvements
- Performance optimizations
- Security enhancements
- Examples and tutorials

### Finding Work

- Check [GitHub Issues](https://github.com/alternatefutures/package-cloud-sdk/issues)
- Look for `good first issue` labels for beginner-friendly tasks
- Look for `help wanted` labels for tasks needing contributors
- Check [Linear](https://linear.app/alternatefutures) for planned features

### Reporting Bugs

Before creating a bug report:
1. Check existing issues to avoid duplicates
2. Verify the bug exists in the latest version
3. Collect relevant information (OS, Node version, SDK version)

Create a bug report with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Code samples
- Error messages
- Environment details

### Suggesting Features

Feature requests should include:
- Clear use case and motivation
- Proposed API or interface
- Possible implementation approach
- Alternatives considered
- Impact on existing functionality

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict type checking
- Avoid `any` types (use `unknown` if necessary)
- Document complex types with comments

### Code Style

We use [BiomeJS](https://biomejs.dev) for formatting and linting.

Check formatting:
```bash
pnpm format:check
```

Apply formatting:
```bash
pnpm format
```

Check linting:
```bash
pnpm lint:check
```

Apply lint fixes:
```bash
pnpm lint
```

Apply both formatting and linting:
```bash
pnpm format:unsafe
```

### File Organization

```
src/
├── clients/          # API client classes
├── services/         # Service implementations
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
├── mocks/            # Test mocks and fixtures
└── __tests__/        # Test files (or *.test.ts co-located)
```

### Documentation

- Add JSDoc comments to all public APIs
- Include `@param`, `@returns`, `@throws`, `@example`
- Update README.md for user-facing changes
- Add inline comments for complex logic

Example:
```typescript
/**
 * Creates a custom domain for a site with DNS verification.
 *
 * @param options - Domain creation options
 * @param options.siteId - The ID of the site
 * @param options.hostname - The domain hostname
 * @returns Promise<Domain> Domain object with verification instructions
 *
 * @example
 * ```typescript
 * const domain = await sdk.domains().createCustomDomain({
 *   siteId: 'site-123',
 *   hostname: 'example.com'
 * });
 * ```
 */
public async createCustomDomain(options: CreateDomainOptions): Promise<Domain> {
  // Implementation
}
```

## Testing

### Running Tests

Run all tests:
```bash
pnpm test
```

Run tests in watch mode:
```bash
pnpm test:watch
```

Run tests with coverage:
```bash
pnpm test:coverage
```

### Writing Tests

- Write tests for all new features
- Write tests for bug fixes
- Aim for >80% code coverage
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

Example:
```typescript
describe('DomainsClient', () => {
  it('should create custom domain with TXT verification', async () => {
    // Arrange
    const sdk = createTestSdk();
    const siteId = 'test-site-123';

    // Act
    const domain = await sdk.domains().createCustomDomain({
      siteId,
      hostname: 'example.com',
      verificationMethod: 'TXT'
    });

    // Assert
    expect(domain.hostname).toBe('example.com');
    expect(domain.txtVerificationToken).toBeDefined();
  });
});
```

### Mock Service Workers

We use MSW for mocking API calls. Add handlers to:
- `src/mocks/graphql/handlers/` for GraphQL
- `src/mocks/rest/handlers/` for REST APIs

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, missing semicolons)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding or updating tests
- `chore`: Changes to build process or auxiliary tools

### Examples

```bash
feat(domains): add custom domain SSL provisioning
fix(ipfs): resolve upload timeout for large files
docs(readme): update installation instructions
test(billing): add usage metrics integration tests
chore(deps): update graphql-request to v6.0.0
```

### Scope

Use the affected module or feature:
- `domains`
- `ipfs`
- `applications`
- `sites`
- `functions`
- `billing`
- `auth`

## Pull Request Process

### Before Submitting

1. Update your branch:
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout your-feature-branch
   git rebase develop
   ```

2. Run tests:
   ```bash
   pnpm test
   ```

3. Check formatting and linting:
   ```bash
   pnpm format:check
   pnpm lint:check
   ```

4. Add changeset (for version bumps):
   ```bash
   pnpm changeset:add
   ```

### Creating a PR

1. Push to your fork:
   ```bash
   git push origin your-feature-branch
   ```

2. Create PR on GitHub targeting `develop` branch

3. Fill out the PR template completely

4. Link related issues (e.g., "Fixes #123")

### PR Requirements

- All tests pass
- Code coverage maintained or improved
- Documentation updated
- Changeset added (if applicable)
- No merge conflicts
- Follows coding standards
- Reviewed and approved

### Review Process

- Maintainers will review within 7 days
- Address feedback promptly
- Keep PRs focused and reasonably sized
- Squash commits before merge (if requested)

## Release Process

### Versioning

We use [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Changesets

Use changesets to document changes:

```bash
pnpm changeset:add
```

Answer the prompts:
- Which packages are affected?
- Is this a patch, minor, or major change?
- Provide a summary of changes

### Release Workflow

1. Changesets are collected on `develop`
2. When ready to release, create version PR:
   ```bash
   pnpm changeset:version
   ```
3. Review and merge version PR
4. Publish to npm:
   ```bash
   pnpm changeset:publish
   ```

## Community

### Getting Help

- GitHub Discussions
- Discord (coming soon)
- Email: support@alternatefutures.ai

### Stay Updated

- Watch the repository for notifications
- Follow [@alternatefutures](https://twitter.com/alternatefutures) on Twitter
- Subscribe to the newsletter

## License

By contributing, you agree that your contributions will be licensed under GPLv3.

## Questions?

Don't hesitate to ask! Create a discussion on GitHub or reach out to the maintainers.

---

Thank you for contributing to a more open, private, and censorship-resistant web!
