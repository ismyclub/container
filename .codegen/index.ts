import { dockerNodeApp, dockerNodeAppConfig, infisicalConfig, npmConfig } from '@studio-75/sdk.container';

const projectSlug = 'main-qx-mr';
const secretPath = '/ismyclub';

const registry = 'https://npm.pkg.github.com/';
const tokenName = 'NPM_TOKEN';
const scopes = ['studio-75', 'ismyclub'];

const standardConfig = {
  LOG_LEVEL: 'info',
};

const pgConfig = {
  PG_DATABASE: '',
  PG_HOST: '',
  PG_USER: '',
  PG_PASSWORD: '',
  PG_PORT: '',
};

const run = async () => {
  const npmSettings = npmConfig().setRegistry(registry).setTokenName(tokenName).addScopes(scopes).create();

  await dockerNodeApp()
    .setInfisicalConfig(infisicalConfig().setProjectSlug(projectSlug).setSecretPath(secretPath).create())
    .addNodeApp(
      dockerNodeAppConfig()
        .addNpmConfig(npmSettings)
        .setAppName('CMS')
        .setAppPkgName('@ismyclub/app.cms')
        .addEnvValues(standardConfig)
        .addEnvValues(pgConfig)
        .setExposePort(3000)
        .setCommand('cms')
        .create()
    )
    .addNodeApp(
      dockerNodeAppConfig()
        .addNpmConfig(npmSettings)
        .setAppName('Fairpark')
        .setAppPkgName('@ismyclub/app.fairpark')
        .addEnvValues(standardConfig)
        .addEnvValues(pgConfig)
        .setExposePort(3000)
        .setCommand('fairpark')
        .create()
    )
    .addNodeApp(
      dockerNodeAppConfig()
        .addNpmConfig(npmSettings)
        .setAppName('Sign Up')
        .setAppPkgName('@ismyclub/app.sign-up')
        .addEnvValues(standardConfig)
        .addEnvValues(pgConfig)
        .setExposePort(3000)
        .setCommand('sign-up')
        .create()
    )
    .addNodeApp(
      dockerNodeAppConfig()
        .addNpmConfig(npmSettings)
        .setAppName('Website')
        .setAppPkgName('@ismyclub/app.website')
        .addEnvValues(standardConfig)
        .addEnvValues(pgConfig)
        .setExposePort(3000)
        .setCommand('website')
        .create()
    )
    .run();
};

run();
