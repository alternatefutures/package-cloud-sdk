#!/usr/bin/env node

/**
 * Generate SDK documentation for the docs repository
 *
 * This script:
 * 1. Runs TypeDoc to generate markdown from TypeScript source
 * 2. Processes and organizes the output
 * 3. Creates an index file
 * 4. Outputs to the docs repository
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync, readdirSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// In CI: cloud-sdk is inside altfutures-docs repo at altfutures-docs/cloud-sdk
// Locally: cloud-sdk is a sibling of altfutures-docs
const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
const DOCS_REPO = isCI
  ? join(__dirname, '../../docs/sdk')  // In CI: scripts/../.. = altfutures-docs, then docs/sdk
  : join(__dirname, '../../altfutures-docs/docs/sdk');  // Locally: sibling directory

const SDK_REPO = dirname(__dirname);

console.log('🔧 Generating SDK documentation...\n');

// Check if docs repo exists
if (!existsSync(DOCS_REPO)) {
  console.error(`❌ Docs repository not found at: ${DOCS_REPO}`);
  console.error('Please ensure altfutures-docs repo is cloned as a sibling directory');
  process.exit(1);
}

/**
 * Run TypeDoc to generate documentation
 */
function runTypeDoc() {
  console.log('📖 Running TypeDoc...');

  try {
    execSync('npx typedoc', {
      cwd: SDK_REPO,
      stdio: 'inherit'
    });
    console.log('✅ TypeDoc generation complete');
  } catch (error) {
    console.error('❌ TypeDoc generation failed:', error.message);
    process.exit(1);
  }
}

/**
 * Create an organized index file
 */
function createIndexFile() {
  console.log('📝 Creating API reference index...');

  const apiDir = join(DOCS_REPO, 'api');

  if (!existsSync(apiDir)) {
    console.error('❌ API docs directory not found');
    return;
  }

  let markdown = '# SDK API Reference\n\n';
  markdown += '> This documentation is auto-generated from the `cloud-sdk` repository using TypeDoc.\n\n';

  // Check for common TypeDoc generated files
  const readmePath = join(apiDir, 'README.md');
  if (existsSync(readmePath)) {
    const readmeContent = readFileSync(readmePath, 'utf8');
    // Extract content after first heading
    const content = readmeContent.split('\n').slice(1).join('\n');
    markdown += content;
  } else {
    markdown += '## Overview\n\n';
    markdown += 'The Alternate Futures SDK provides a comprehensive JavaScript/TypeScript API for interacting with the platform.\n\n';
    markdown += '## Installation\n\n';
    markdown += '```bash\n';
    markdown += 'npm install @alternatefutures/sdk\n';
    markdown += '```\n\n';
    markdown += '## Quick Start\n\n';
    markdown += '```typescript\n';
    markdown += 'import { AlternateFutures } from \'@alternatefutures/sdk\';\n\n';
    markdown += 'const af = new AlternateFutures({ apiKey: process.env.AF_API_KEY });\n\n';
    markdown += '// List agents\n';
    markdown += 'const agents = await af.agents.list();\n';
    markdown += '```\n\n';
  }

  // List all generated documentation files
  const files = readdirSync(apiDir).filter(f => f.endsWith('.md') && f !== 'README.md');

  if (files.length > 0) {
    markdown += '## API Documentation\n\n';
    files.forEach(file => {
      const name = file.replace('.md', '');
      markdown += `- [${name}](./api/${name})\n`;
    });
    markdown += '\n';
  }

  const outputFile = join(DOCS_REPO, 'api.md');
  writeFileSync(outputFile, markdown, 'utf8');

  console.log(`✨ API reference index created at: ${outputFile}`);
}

/**
 * Main execution
 */
function main() {
  runTypeDoc();
  createIndexFile();

  console.log('\n✅ SDK documentation generation complete!\n');
}

main();
