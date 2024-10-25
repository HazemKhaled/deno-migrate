import { join } from "https://deno.land/std@0.211.0/path/mod.ts";
import type { DenoConfigType } from "./types.ts";

export async function migrateNpmScripts(
  existingDenoConfig: DenoConfigType,
) {
  try {
    const packageJsonPath = join(Deno.cwd(), "package.json");
    const pkgJson = JSON.parse(await Deno.readTextFile(packageJsonPath));

    return {
      ...existingDenoConfig,
      tasks: {
        ...(existingDenoConfig.tasks || {}),
        ...(pkgJson.scripts || {}),
      },
    } as DenoConfigType;
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error migrating scripts:", error.message);
    } else {
      console.error("❌ Error migrating scripts:", error);
    }

    return existingDenoConfig;
  }
}