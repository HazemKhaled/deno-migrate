import { deepMerge } from "jsr:@std/collections@1.0.9";

import type { DenoConfigType } from "#/types.ts";

export async function migrate({
  file,
  existingDenoConfig,
}: {
  file: string;
  existingDenoConfig: DenoConfigType;
}) {
  try {
    const configFile = JSON.parse(await Deno.readTextFile(file));
    const { compilerOptions = {}, include = [], exclude = [] } = configFile;

    const newConfig: DenoConfigType = {
      compilerOptions,
      fmt: {
        include,
        exclude,
      },
    };

    return deepMerge(newConfig, existingDenoConfig);
  } catch (error) {
    console.error(
      "❌ Error migrating scripts:",
      error instanceof Error ? error.message : error,
    );
    return existingDenoConfig;
  }
}
