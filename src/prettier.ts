import { basename } from "jsr:@std/path@1.0.7";
import { deepMerge } from "jsr:@std/collections@1.0.9";

import type { DenoConfigType, GlobalConfigType } from "./types.ts";

const configMap: Record<string, string> = {
  useTabs: "useTabs",
  printWidth: "lineWidth",
  tabWidth: "indentWidth",
  semi: "semiColons",
  singleQuote: "singleQuote",
  proseWrap: "proseWrap",
};

const mapRules = (options: GlobalConfigType): GlobalConfigType => {
  const resOptions: GlobalConfigType = {};

  for (const item in options) {
    if (Object.hasOwn(configMap, item)) {
      resOptions[configMap[item]] = options[item];
    }
  }

  return resOptions;
};

export async function migratePrettierScripts({
  file,
  existingDenoConfig,
}: {
  file: string;
  existingDenoConfig: DenoConfigType;
}) {
  try {
    const fileData = await Deno.readTextFile(file);

    if (basename(file) === ".prettierignore") {
      return handleTextFile(fileData, existingDenoConfig);
    }

    return handleJsonFile(fileData, existingDenoConfig);
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error migrating scripts:", error.message);
    } else {
      console.error("❌ Error migrating scripts:", error);
    }

    return existingDenoConfig;
  }
}

export const handleTextFile = (
  fileData: string,
  existingDenoConfig: DenoConfigType,
): DenoConfigType => {
  const paths = fileData.split("\n").filter((el) => el.length);

  return deepMerge({
    fmt: {
      options: {
        exclude: paths,
      },
    },
  }, existingDenoConfig);
};

export const handleJsonFile = (
  fileData: string,
  existingDenoConfig: DenoConfigType,
): DenoConfigType => {
  const configFile = JSON.parse(fileData);

  return deepMerge({
    fmt: {
      options: {
        ...mapRules(configFile || {}),
      },
    },
  }, existingDenoConfig);
};
