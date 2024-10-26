import { walk } from "jsr:@std/fs@1.0.5";
import { join } from "jsr:@std/path@1.0.7";

import type { DenoConfigType } from "./types.ts";
import { CONFIG_GROUPS } from "./configs-map.ts";

export async function readDenoConfig({
  workingDirectory,
}: {
  workingDirectory: string;
}): Promise<DenoConfigType> {
  try {
    const denoJsonContent = await Deno.readTextFile(
      join(workingDirectory, "deno.json"),
    );

    return JSON.parse(denoJsonContent);
  } catch (_error) {
    console.log("deno.json not found, creating a new one...");
    // If the file doesn't exist, create and empty one
    writeDenoConfig({
      workingDirectory,
      updatedDenoJson: {} as DenoConfigType,
    });
    return {} as DenoConfigType;
  }
}

export async function writeDenoConfig({
  workingDirectory,
  updatedDenoJson,
}: {
  workingDirectory: string;
  updatedDenoJson: DenoConfigType;
}) {
  try {
    await Deno.writeTextFile(
      join(workingDirectory, "deno.json"),
      JSON.stringify(updatedDenoJson, null, 2),
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error writing to deno.json:", error.message);
    } else {
      console.error("❌ Error writing to deno.json:", error);
    }
  }
}

export async function getConfigFiles(workingDirectory: string = Deno.cwd()) {
  const configFiles: Record<string, Record<string, string>> = {};

  // Initialize each tool group with an empty object
  for (const tool of Object.keys(CONFIG_GROUPS)) {
    configFiles[tool] = {};
  }

  // Walk the directory and match files to their corresponding tool
  for await (const entry of walk(workingDirectory, { maxDepth: 1 })) {
    const filename = entry.name;
    const filepath = join(workingDirectory, filename);

    for (const [tool, files] of Object.entries(CONFIG_GROUPS)) {
      if (files.includes(filename)) {
        configFiles[tool][filename] = filepath;
      }
    }
  }

  return configFiles;
}

export async function getAvailableOptions(
  workingDirectory: string = Deno.cwd(),
) {
  const configFiles = await getConfigFiles(workingDirectory);
  const availableOptions = [];

  for (const [tool, files] of Object.entries(CONFIG_GROUPS)) {
    for (const file of files) {
      if (configFiles[tool]?.[file]) {
        availableOptions.push({
          name: `${tool}: ${file}`,
          value: `${tool}_${file}`,
        });
      }
    }
  }

  return availableOptions;
}
