import { onboard } from '@studio-75/sdk.onboard';
import { dockerfileNodeApp } from '@studio-75/sdk.dockerfile.node-app';
import { dockerGitHubAction } from '@studio-75/sdk.github-action.docker.node-app';

const envStandard = {
  LOG_LEVEL: 'info',
};

const envDatabase = {
  PG_DATABASE: '',
  PG_HOST: '',
  PG_USER: '',
  PG_PASSWORD: '',
  PG_PORT: '',
};

const infisical = { projectSlug: 'execution-environments-v5w-q', secretPath: '/github' };
const npmSettings = { registry: 'https://npm.pkg.github.com/', scopes: ['studio-75', 'ismyclub'] };
const env = { ...envStandard, ...envDatabase };
const appWebsite = { name: 'Website', package: '@ismyclub/app.website', command: 'website', env };
const appCms = { name: 'CMS', package: '@ismyclub/app.cms', command: 'cms', env };
const appFairpark = { name: 'Fairpark', package: '@ismyclub/app.fairpark', command: 'fairpark', env };
const appSignUp = { name: 'Sign Up', package: '@ismyclub/app.sign-up', command: 'sign-up', env };

const run = async () => {
  await onboard();
  await dockerfileNodeApp({ npmSettings, apps: [appWebsite, appCms, appFairpark, appSignUp] });
  await dockerGitHubAction({ infisical, appNames: [appWebsite.name, appCms.name, appFairpark.name, appSignUp.name] });
};

run();
