# IsMyClub container

> This repo creates and publishes IsMyClub Docker images.

## Developer Quick start

```bash
# Install dependencies
pnpm install
```

## Developer Setup

## CI/CD Setup

The CI/CD pipeline for this repository uses a Personal Access Token with the correct scope, stored in an action secret called **NPM_TOKEN**, so that:

- When generating the Docker images, they can install the relevant packages from the GitHub Package Registry.

To create/rotate the token:

1. Navigate to the [User Settings / Access Tokens page](https://github.com/settings/tokens) and select 'Generate new token' | 'Generate new token (classic)'.
2. Add '@ismyclub/container - npm install' as note, 'No Expiration' as expiration, 'read:packages' as scope, and click the 'Generate token' button.
3. Copy the value of the new token into the **NPM_TOKEN** action secret in the [Actions secrets and variables page](https://github.com/ismyclub/tools/settings/secrets/actions).

> Note: If other repositories are using the same **NPM_TOKEN** in CI/CD, be sure to change them too.

## References

- [npm-config](https://docs.npmjs.com/cli/v8/commands/npm-config)
