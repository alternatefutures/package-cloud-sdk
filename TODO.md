# SDK TODOs

## Custom Domain Tests (ALT-38)

**Status**: 🔴 BLOCKED - Waiting for backend deployment

**Issue**: Custom domain tests are currently skipped in `src/clients/domains.test.ts` (line 574)

**Blocker**: Backend API needs to be deployed with new GraphQL schema

**Tasks**:
- [ ] Wait for backend PR #2 to merge: https://github.com/alternatefutures/alternatefutures-backend/pull/2
- [ ] Wait for backend deployment to staging/production
- [ ] Verify GraphQL schema includes new custom domain operations
- [ ] Remove `describe.skip` from "Custom Domains with SSL" test suite
- [ ] Run `pnpm test` to verify all tests pass
- [ ] Delete this TODO section when complete

**Required GraphQL Operations**:
- `createDomain(input: CreateDomainInput!): Domain!`
- `verifyDomain(domainId: ID!): Boolean!`
- `provisionSsl(domainId: ID!, email: String!): Domain!`
- `setPrimaryDomain(siteId: ID!, domainId: ID!): Boolean!`
- `removeDomain(domainId: ID!): Boolean!`
- `domainVerificationInstructions(domainId: ID!): VerificationInstructions!`
- `domains(siteId: ID!): [Domain!]!`

**Related PRs**:
- Backend: https://github.com/alternatefutures/alternatefutures-backend/pull/2
- CLI: https://github.com/alternatefutures/cloud-cli/pull/2

**Date Added**: 2025-11-06
**Added By**: Claude Code
