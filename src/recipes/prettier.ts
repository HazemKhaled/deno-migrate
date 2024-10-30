import { basename } from "jsr:@std/path@1.0.7";
import { deepMerge } from "jsr:@std/collections@1.0.9";

import type { DenoConfigType, GlobalConfigType } from "../types.ts";

const configMap: Record<string, string> = {
  useTabs: "useTabs",
  printWidth: "lineWidth",
  tabWidth: "indentWidth",
  semi: "semiColons",
  singleQuote: "singleQuote",
  proseWrap: "proseWrap",
};

const mapRules = (options: GlobalConfigType): GlobalConfigType => {
  return Object.keys(options).reduce((resOptions, key) => {
    if (configMap[key]) {
      resOptions[configMap[key]] = options[key];
    }
    return resOptions;
  }, {} as GlobalConfigType);
};

export async function migrate({
  file,
  existingDenoConfig,
}: {
  file: string;
  existingDenoConfig: DenoConfigType;
}) {
  try {
    const fileData = await Deno.readTextFile(file);
    const handler = basename(file) === ".prettierignore"
      ? handleTextFile
      : handleJsonFile;
    return handler(fileData, existingDenoConfig);
  } catch (error) {
    console.error(
      "❌ Error migrating scripts:",
      error instanceof Error ? error.message : error,
    );
    return existingDenoConfig;
  }
}

const handleTextFile = (
  fileData: string,
  existingDenoConfig: DenoConfigType,
): DenoConfigType => {
  const paths = fileData.split("\n").filter(Boolean);
  return deepMerge(
    { fmt: { options: { exclude: paths } } },
    existingDenoConfig,
  );
};

export const handleJsonFile = (
  fileData: string,
  existingDenoConfig: DenoConfigType,
): DenoConfigType => {
  const configFile = JSON.parse(fileData);
  return deepMerge(
    { fmt: { options: { ...mapRules(configFile || {}) } } },
    existingDenoConfig,
  );
};
