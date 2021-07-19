import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

import chalk from "chalk";
import plist from "plist";
import { valid } from "semver";

import { log, readPackage } from "./utils";

type PlistVersion = {
  CFBundleShortVersionString: string;
  CFBundleVersion: string;
};

const infoPlistPath = resolve(process.cwd(), "ios/App/App/Info.plist");

export const syncIos = async () => {
  const { version } = readPackage(resolve(process.cwd(), "package.json"));

  if (!valid(version)) {
    log(chalk`  {red Invalid version: "${version}". Nothing to do.}`);
    process.exit();
  }

  let content = readFileSync(infoPlistPath, { encoding: "utf8" });

  const infoPlist = plist.parse(content) as PlistVersion;

  infoPlist.CFBundleShortVersionString = version;
  infoPlist.CFBundleVersion = version;

  content = plist.build(infoPlist);

  writeFileSync(infoPlistPath, content, { encoding: "utf8" });
  log(chalk`{green ✔} Sync version ${version} for ios.`);
};
