# Publishing Guide

This guide explains how to publish the `@zixflow/analytics-next` package to npm.

## Prerequisites

1. **NPM Account**: You need an npm account with access to the `@zixflow` organization
2. **NPM Login**: You must be logged into npm CLI
3. **Git Setup**: Ensure you have proper git configuration

## Publishing Methods

### Method 1: Manual Publishing

If you prefer to publish manually:

1. **Login to npm**:
   ```bash
   npm login
   ```

2. **Run the publishing script**:
   ```bash
   npm run publish:package
   ```

3. **Or publish manually**:
   ```bash
   # Update version
   npm version patch  # or minor, major
   
   # Build and publish
   npm run build:clean
   npm publish
   ```

## Version Management

### Semantic Versioning

Follow [semantic versioning](https://semver.org/):

- **Patch** (1.0.0 → 1.0.1): Bug fixes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Major** (1.0.0 → 2.0.0): Breaking changes

### Version Commands

```bash
# Patch version (bug fixes)
npm version patch

# Minor version (new features)
npm version minor

# Major version (breaking changes)
npm version major

# Custom version
npm version 1.2.3
```

## Pre-Publishing Checklist

Before publishing, ensure:

- [ ] All tests pass
- [ ] Linting passes (`npm run lint`)
- [ ] Build is successful (`npm run build:clean`)
- [ ] Version is updated appropriately
- [ ] README.md is up to date
- [ ] CHANGELOG.md is updated (if applicable)
- [ ] Working directory is clean (`git status`)

## Publishing Script Features

The `scripts/publish.sh` script includes:

- ✅ Branch validation (must be on master)
- ✅ Working directory cleanliness check
- ✅ NPM login verification
- ✅ Dependency installation
- ✅ Linting and building
- ✅ Version bumping
- ✅ Publishing to npm
- ✅ Git tagging and pushing

## GitHub Actions Setup

### Required Secrets

Set up these secrets in your GitHub repository:

1. **NPM_TOKEN**: Your npm authentication token
   - Generate at: https://www.npmjs.com/settings/tokens
   - Add to repository secrets as `NPM_TOKEN`

### Workflow Triggers

- **CI**: Runs on every push to master and pull request
- **Publish**: Runs when a tag starting with `v` is pushed

## Troubleshooting

### Common Issues

1. **"Not logged into npm"**
   ```bash
   npm login
   ```

2. **"Working directory not clean"**
   ```bash
   git add .
   git commit -m "chore: prepare for release"
   ```

3. **"Build failed"**
   ```bash
   npm run build:clean
   npm run test:build
   ```

4. **"Permission denied"**
   - Ensure you have access to the `@zixflow` organization
   - Check your npm permissions

### Rollback

If you need to unpublish a version:

```bash
npm unpublish @zixflow/analytics-next@1.0.1
```

**Note**: npm only allows unpublishing within 72 hours of publishing.

## Package Configuration

The package is configured with:

- **Public access**: `"access": "public"`
- **ES modules**: `"type": "module"`
- **TypeScript support**: Full type definitions
- **Multiple entry points**: CommonJS and ES modules
- **Optimized builds**: Source maps and declarations

## Post-Publishing

After successful publishing:

1. **Verify the package**:
   ```bash
   npm view @zixflow/analytics-next
   ```

2. **Test installation**:
   ```bash
   npm install @zixflow/analytics-next
   ```

3. **Update documentation** if needed

4. **Announce the release** to your team/users

## Support

If you encounter issues during publishing:

1. Check the GitHub Actions logs
2. Verify npm permissions
3. Ensure all prerequisites are met
4. Contact the maintainers if needed 