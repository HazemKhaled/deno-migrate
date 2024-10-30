import type { DenoConfigType } from "../types.ts";

export async function migrate({
  file,
  existingDenoConfig,
}: {
  file: string;
  existingDenoConfig: DenoConfigType;
}) {
  const pkgJson = await readPackageJson(file);

  if (!pkgJson) {
    return existingDenoConfig;
  }

  return {
    ...existingDenoConfig,
    tasks: {
      ...(existingDenoConfig.tasks || {}),
      ...(pkgJson.scripts || {}),
    },
  } as DenoConfigType;
}

async function readPackageJson(file: string) {
  try {
    const content = await Deno.readTextFile(file);
    return JSON.parse(content);
  } catch (error) {
    handleError(error);
    return null;
  }
}

function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error("❌ Error migrating scripts:", error.message);
  } else {
    console.error("❌ Error migrating scripts:", error);
  }
}
