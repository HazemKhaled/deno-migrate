import type { DenoConfigType, GlobalConfigType } from "./types.ts";

// TODO:: need to add all supported types conversion 🚨
// For more help: https://docs.deno.com/runtime/fundamentals/linting_and_formatting
const configMap: Record<string, string> = {
  tabWidth: "indentWidth",
  semi: "semiColons",
};

const mapRules = (options: GlobalConfigType): GlobalConfigType => {
  const resOptions: GlobalConfigType = {};

  for (const item in options) {
    if (Object.hasOwn(configMap, item)) {
      resOptions[configMap[item]] = options[item];
    } else {
      resOptions[item] = options[item];
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
    const configFile = JSON.parse(await Deno.readTextFile(file));

    return {
      ...existingDenoConfig,
      fmt: {
        options: {
          ...mapRules(configFile || {}),
        },
      },
    } as unknown as DenoConfigType;
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error migrating scripts:", error.message);
    } else {
      console.error("❌ Error migrating scripts:", error);
    }

    return existingDenoConfig;
  }
}
