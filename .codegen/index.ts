import { appConfig, dockerNodeApp, dockerNodeAppConfig, infisicalConfig, npmConfig } from '@studio-75/sdk.container';
import { onboard } from '@studio-75/sdk.onboard';

const infisical = {
  projectSlug: 'main-qx-mr',
  secretPath: '/ismyclub'
}

const npm = {
  registry: 'https://npm.pkg.github.com/',
  tokenName: 'NPM_TOKEN',
  scopes: ['studio-75', 'ismyclub'],
}

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
  await onboard().run();
  const npmSettings = npmConfig().setRegistry(npm.registry).setTokenName(npm.tokenName).addScopes(npm.scopes).create();

  await dockerNodeApp()
    .setInfisicalConfig(infisicalConfig().setProjectSlug(infisical.projectSlug).setSecretPath(infisical.secretPath).create())
    .addNodeApp(
      dockerNodeAppConfig()
        .addNpmConfig(npmSettings)
        .setAppConfig(appConfig().setName('CMS').setPackage('@ismyclub/app.cms').setCommand('cms').create())
        .addEnvValues({ ...standardConfig, ...pgConfig })
        .setExposePort(3000)
        .create()
    )
    .addNodeApp(
      dockerNodeAppConfig()
        .addNpmConfig(npmSettings)
        .setAppConfig(appConfig().setName('Fairpark').setPackage('@ismyclub/app.fairpark').setCommand('fairpark').create())
        .addEnvValues({ ...standardConfig, ...pgConfig })
        .setExposePort(3000)
        .create()
    )
    .addNodeApp(
      dockerNodeAppConfig()
        .addNpmConfig(npmSettings)
        .setAppConfig(appConfig().setName('Sign Up').setPackage('@ismyclub/app.sign-up').setCommand('sign-up').create())
        .addEnvValues({ ...standardConfig, ...pgConfig })
        .setExposePort(3000)
        .create()
    )
    .addNodeApp(
      dockerNodeAppConfig()
        .addNpmConfig(npmSettings)
        .setAppConfig(appConfig().setName('Website').setPackage('@ismyclub/app.website').setCommand('website').create())
        .addEnvValues(standardConfig)
        .addEnvValues(pgConfig)
        .setExposePort(3000)
        .create()
    )
    .run();
};

run();
