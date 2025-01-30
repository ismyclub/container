import { appConfig, dockerNodeApp, dockerNodeAppConfig, infisicalConfig, npmConfig } from '@studio-75/sdk.container';
import { onboard } from '@studio-75/sdk.onboard';
import { cms, fairpark, infisical, npm, pgConfig, signUp, standardConfig, website } from './config';

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
