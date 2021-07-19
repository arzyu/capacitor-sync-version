import { resolve } from "path";

import to from "await-to-js";
import chalk from "chalk";
import readProps from "properties-reader";
import { valid } from "semver";

import { log, readPackage } from "./utils";

const appPropertiesPath = resolve(process.cwd(), "android/app/app.properties");

const generateVersionCode = (version: string) => {
  const [major, minor, patch] = version.split(".");
  return (parseInt(major) * 1000000) + (parseInt(minor) * 1000) + parseInt(patch);
};

export const syncAndroid = async () => {
  const { version } = readPackage(resolve(process.cwd(), "package.json"));

  if (!valid(version)) {
    log(chalk`  {red Invalid version: "${version}". Nothing to do.}`);
    process.exit();
  }

  const appProps = readProps(appPropertiesPath);
  const newVersionCode = generateVersionCode(version);

  appProps.set("versionCode", newVersionCode);
  appProps.set("versionName", version);

  const [err] = await to(appProps.save(appPropertiesPath));

  if (err) {
    log(chalk`  {red Failed to sync version ${err.message}}`);
    process.exit();
  }

  log(chalk`{green ✔} Sync version ${version} for android.`);
};
