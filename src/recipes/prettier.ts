import { basename } from "jsr:@std/path@1.0.7";
import { deepMerge } from "jsr:@std/collections@1.0.9";

import type { DenoConfigType, FmtOptionsType, PrettierType } from "../types.ts";

const prettierToDenoFmtMap: Partial<
  Record<keyof PrettierType, keyof FmtOptionsType>
> = {
  useTabs: "useTabs",
  printWidth: "lineWidth",
  tabWidth: "indentWidth",
  semi: "semiColons",
  singleQuote: "singleQuote",
  proseWrap: "proseWrap",
};

export const mapRules = (
  options: Partial<PrettierType>,
): Partial<FmtOptionsType> => {
  return Object.entries(options).reduce((resOptions, [key, value]) => {
    const denoKey = prettierToDenoFmtMap[key as keyof PrettierType];
    if (denoKey) {
      resOptions[denoKey] = value as boolean & number;
    } else {
      console.warn(`❌ Prettier ${key} is not a supported Deno FMT`);
    }
    return resOptions;
  }, {} as Partial<FmtOptionsType>);
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

export const handleTextFile = (
  fileData: string,
  existingDenoConfig: DenoConfigType,
): DenoConfigType => {
  const paths = fileData.split("\n").filter(Boolean);
  return deepMerge<DenoConfigType>(
    { fmt: { exclude: paths } },
    existingDenoConfig,
  );
};

export const handleJsonFile = (
  fileData: string,
  existingDenoConfig: DenoConfigType,
): DenoConfigType => {
  const configFile: PrettierType = JSON.parse(fileData) ?? {};
  return deepMerge<DenoConfigType>(
    { fmt: { options: { ...mapRules(configFile) } } },
    existingDenoConfig,
  );
};
