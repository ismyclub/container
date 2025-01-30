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

const website = {
  name: 'Website',
  package: '@ismyclub/app.website',
  command: 'website',
}

const cms = {
  name: 'CMS',
  package: '@ismyclub/app.cms',
  command: 'cms',
}

const fairpark = {
  name: 'Fairpark',
  package: '@ismyclub/app.fairpark',
  command: 'fairpark',
}

const signUp = {
  name: 'Sign Up',
  package: '@ismyclub/app.sign-up',
  command: 'sign-up',
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

  await dockerNodeApp()
    .setInfisicalConfig(infisicalConfig().setProjectSlug(infisical.projectSlug).setSecretPath(infisical.secretPath).create())
    .addNodeApp(
      dockerNodeAppConfig()
        .addNpmConfig(npmConfig().setRegistry(npm.registry).setTokenName(npm.tokenName).addScopes(npm.scopes).create())
        .setAppConfig(appConfig().setName(cms.name).setPackage(cms.package).setCommand(cms.command).create())
        .addEnvValues({ ...standardConfig, ...pgConfig })
        .setExposePort(3000)
        .create()
    )
    .addNodeApp(
      dockerNodeAppConfig()
        .addNpmConfig(npmConfig().setRegistry(npm.registry).setTokenName(npm.tokenName).addScopes(npm.scopes).create())
        .setAppConfig(appConfig().setName(fairpark.name).setPackage(fairpark.package).setCommand(fairpark.command).create())
        .addEnvValues({ ...standardConfig, ...pgConfig })
        .setExposePort(3000)
        .create()
    )
    .addNodeApp(
      dockerNodeAppConfig()
        .addNpmConfig(npmConfig().setRegistry(npm.registry).setTokenName(npm.tokenName).addScopes(npm.scopes).create())
        .setAppConfig(appConfig().setName(signUp.name).setPackage(signUp.package).setCommand(signUp.command).create())
        .addEnvValues({ ...standardConfig, ...pgConfig })
        .setExposePort(3000)
        .create()
    )
    .addNodeApp(
      dockerNodeAppConfig()
        .addNpmConfig(npmConfig().setRegistry(npm.registry).setTokenName(npm.tokenName).addScopes(npm.scopes).create())
        .setAppConfig(appConfig().setName(website.name).setPackage(website.package).setCommand(website.command).create())
        .addEnvValues(standardConfig)
        .addEnvValues(pgConfig)
        .setExposePort(3000)
        .create()
    )
    .run();
};

run();
