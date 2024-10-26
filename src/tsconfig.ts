import type { DenoConfigType } from "./types.ts";
import { deepMerge } from "jsr:@std/collections";

export async function migrateTsConfigScripts({
  file,
  existingDenoConfig,
}: {
  file: string;
  existingDenoConfig: DenoConfigType;
}) {
  try {
    const configFile = JSON.parse(await Deno.readTextFile(file));

    const compilerOptions = configFile["compilerOptions"] ?? {};
    const include = configFile["include"] ?? [];
    const exclude = configFile["exclude"] ?? [];

    return deepMerge({
      compilerOptions,
      fmt: {
        options: {
          include,
          exclude,
        },
      },
    }, existingDenoConfig);
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error migrating scripts:", error.message);
    } else {
      console.error("❌ Error migrating scripts:", error);
    }

    return existingDenoConfig;
  }
}
