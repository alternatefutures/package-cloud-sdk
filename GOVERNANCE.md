# Project Governance

## Overview

This document outlines the governance model for the Alternate Futures SDK. Our goal is to maintain a transparent, inclusive, and efficient decision-making process that aligns with our values of openness, privacy, and censorship resistance.

## Project Values

1. **Privacy First**: User privacy is non-negotiable
2. **Censorship Resistance**: Enable free expression and access
3. **Open Source**: Transparent development and auditable code
4. **Decentralization**: Reduce single points of failure
5. **Community Driven**: Listen to and empower contributors

## Roles and Responsibilities

### Users

Anyone who uses the SDK. Users are encouraged to:
- Report bugs and issues
- Request features
- Provide feedback
- Share use cases

### Contributors

Anyone who contributes to the project through:
- Code contributions
- Documentation improvements
- Bug reports with reproduction steps
- Feature proposals
- Community support

Contributors are recognized in release notes and commit history.

### Maintainers

Individuals with commit access who:
- Review and merge pull requests
- Triage issues
- Guide project direction
- Enforce Code of Conduct
- Manage releases

Current Maintainers:
- Alternate Futures Core Team

### Core Team

The Alternate Futures Core Team provides:
- Strategic direction
- Infrastructure support
- Final decision authority on disputes
- Trademark and legal oversight

## Decision-Making Process

### Consensus-Based

We strive for consensus on all decisions:

1. **Proposal**: Anyone can propose changes via GitHub issue or discussion
2. **Discussion**: Community discusses merits, concerns, alternatives
3. **Refinement**: Proposal is refined based on feedback
4. **Consensus**: Maintainers seek agreement among active contributors
5. **Implementation**: Once consensus is reached, work proceeds

### Voting (When Consensus Fails)

If consensus cannot be reached:

1. **Call for Vote**: Maintainer initiates formal vote
2. **Voting Period**: 7 days for maintainers to vote
3. **Approval**: Simple majority (>50%) required
4. **Tie Breaking**: Core Team has final say

Voting applies to:
- Major architectural changes
- Breaking API changes
- Governance changes
- Contentious features

### Fast Track

Minor changes can be fast-tracked:
- Bug fixes
- Documentation improvements
- Dependency updates
- Test improvements
- Code formatting

Process:
1. Create PR
2. Single maintainer approval
3. Merge

## Contribution Process

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Pull Request Review

PRs require:
- At least one maintainer approval
- All tests passing
- No unresolved discussions
- Compliance with Code of Conduct

Maintainers commit to:
- Initial response within 7 days
- Review completion within 14 days
- Provide constructive feedback

### Issue Triage

Issues are triaged with labels:
- **Priority**: `P0` (critical), `P1` (high), `P2` (medium), `P3` (low)
- **Type**: `bug`, `feature`, `docs`, `question`
- **Status**: `needs-triage`, `needs-info`, `blocked`, `ready`
- **Difficulty**: `good first issue`, `help wanted`

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):
- **Major (X.0.0)**: Breaking changes
- **Minor (x.X.0)**: New features (backward compatible)
- **Patch (x.x.X)**: Bug fixes

### Release Cadence

- **Patch releases**: As needed for critical bugs
- **Minor releases**: Monthly (or when features are ready)
- **Major releases**: When breaking changes accumulate

### Release Process

1. Collect changesets on `develop` branch
2. Create version PR with `pnpm changeset:version`
3. Review changelog and version bumps
4. Merge to `develop`
5. Create PR from `develop` to `main`
6. After merge, publish to npm
7. Create GitHub release with notes

### LTS Policy

We support:
- **Current major version**: Full support
- **Previous major version**: Security fixes for 6 months
- **Older versions**: No support (upgrade recommended)

## Conflict Resolution

### Code of Conduct Violations

1. Report to conduct@alternatefutures.ai
2. Core Team investigates within 7 days
3. Action taken per [Code of Conduct](CODE_OF_CONDUCT.md)
4. Appeals to full Core Team

### Technical Disagreements

1. Discuss in GitHub issue or discussion
2. Seek compromise and consensus
3. Escalate to maintainer vote if needed
4. Core Team breaks ties

### Maintainer Disputes

1. Discuss privately among maintainers
2. Mediation by neutral Core Team member
3. Final decision by Core Team vote

## Adding Maintainers

### Criteria

New maintainers should demonstrate:
- Sustained contributions over 6+ months
- High-quality code and reviews
- Understanding of project goals
- Collaborative and constructive communication
- Commitment to Code of Conduct

### Process

1. Existing maintainer nominates contributor
2. Nomination discussed among maintainers
3. Consensus or vote required
4. Nominee accepts or declines
5. Access granted and announcement made

## Removing Maintainers

Maintainers may be removed for:
- Extended inactivity (6+ months)
- Code of Conduct violations
- Abuse of privileges
- Voluntary resignation

Process:
1. Core Team initiates review
2. Discussion with maintainer (if possible)
3. Core Team vote
4. Access revoked
5. Announcement (with sensitivity to circumstances)

## Project Evolution

### Roadmap

Public roadmap maintained at:
- GitHub Projects
- Linear (public view)
- Quarterly blog posts

Community can:
- Suggest roadmap items
- Vote on priorities
- Contribute to planned features

### Major Changes

Breaking changes or major architectural shifts require:
1. RFC (Request for Comments) in GitHub Discussions
2. Minimum 30-day comment period
3. Consensus among maintainers
4. Core Team approval
5. Migration guide for users

## Transparency

We commit to:
- **Public Development**: All development on GitHub
- **Public Discussions**: Technical decisions in open issues/discussions
- **Public Roadmap**: Feature planning visible to community
- **Open Meetings**: Community calls (quarterly)
- **Financial Transparency**: Funding sources and expenses disclosed

## Amendments

This governance document may be amended:

1. Proposal via GitHub Discussion
2. 30-day comment period
3. Maintainer consensus or vote
4. Core Team approval
5. Update document and announce

## Contact

- **General**: support@alternatefutures.ai
- **Governance**: governance@alternatefutures.ai
- **Code of Conduct**: conduct@alternatefutures.ai
- **Security**: security@alternatefutures.ai

---

**Last Updated**: 2024-11-12
**Version**: 1.0
