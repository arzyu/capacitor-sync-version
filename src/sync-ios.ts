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
  const { version, build } = readPackage(resolve(process.cwd(), "package.json"));

  if (!valid(version)) {
    log(chalk`  {red Invalid version: "${version}". Nothing to do.}`);
    process.exit();
  }
  if (!valid(build)) {
    build = version;
  }

  let content = readFileSync(infoPlistPath, { encoding: "utf8" });

  const infoPlist = plist.parse(content) as PlistVersion;

  infoPlist.CFBundleShortVersionString = version;
  infoPlist.CFBundleVersion = build;

  content = plist.build(infoPlist);

  writeFileSync(infoPlistPath, `${content}\n`, { encoding: "utf8" });
  log(chalk`{green ✔} Sync version ${version} for ios.`);
};
