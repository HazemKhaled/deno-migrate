import type { DenoConfigType } from "../types.ts";

export async function migrate({
  file,
  existingDenoConfig,
}: {
  file: string;
  existingDenoConfig: DenoConfigType;
}) {
  try {
    const pkgJson = JSON.parse(await Deno.readTextFile(file));

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
