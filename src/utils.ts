import chalk from "chalk";
import loadJsonFile from "load-json-file";

type PackageInfo = {
  name: string;
  version: string;
};

export const readPackage = (pkgPath: string) => {
  return loadJsonFile.sync(pkgPath) as PackageInfo;
};

export const log = (...messages: string[]) => {
  console.log(...messages.map(m => chalk`${m} {gray [capacitor-sync-version]}`));
};
