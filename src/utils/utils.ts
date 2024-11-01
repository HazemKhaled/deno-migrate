import { walk } from "jsr:@std/fs@1.0.5";
import { join } from "jsr:@std/path@1.0.7";

import { CONFIG_GROUPS } from "#/utils/configs-map.ts";

import type { ConfigGroupsType, DenoConfigType } from "#/types.ts";

export async function readDenoConfig({
  workingDirectory,
}: {
  workingDirectory: string;
}): Promise<DenoConfigType> {
  const configPath = join(workingDirectory, "deno.json");

  try {
    const denoJsonContent = await Deno.readTextFile(configPath);
    return JSON.parse(denoJsonContent);
  } catch (_error) {
    console.log("deno.json not found, creating a new one...");
    await writeDenoConfig({
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
  const configPath = join(workingDirectory, "deno.json");

  try {
    await Deno.writeTextFile(
      configPath,
      JSON.stringify(updatedDenoJson, null, 2),
    );
  } catch (error) {
    console.error(
      "❌ Error writing to deno.json:",
      error instanceof Error ? error.message : error,
    );
  }
}

export async function getConfigFiles(workingDirectory: string = Deno.cwd()) {
  const configFiles: ConfigGroupsType = initializeConfigFiles();

  for await (const entry of walk(workingDirectory, { maxDepth: 1 })) {
    matchConfigFiles(
      entry.name,
      join(workingDirectory, entry.name),
      configFiles,
    );
  }

  return configFiles;
}

function initializeConfigFiles() {
  const configFiles: ConfigGroupsType = {};

  // Initialize each tool group with an empty object
  for (const tool of Object.keys(CONFIG_GROUPS)) {
    configFiles[tool] = {};
  }
  return configFiles;
}

function matchConfigFiles(
  filename: string,
  filepath: string,
  configFiles: ConfigGroupsType,
) {
  for (const [tool, patterns] of Object.entries(CONFIG_GROUPS)) {
    for (const pattern of patterns) {
      const regex = new RegExp(pattern);
      // console.log({regex, filename, "test": regex.test(filename)});
      if (regex.test(filename)) {
        configFiles[tool][filename] = filepath;
      }
    }
  }
}

export async function getAvailableOptions(
  workingDirectory: string = Deno.cwd(),
) {
  const configFiles = await getConfigFiles(workingDirectory);
  return generateAvailableOptions(configFiles);
}

function generateAvailableOptions(
  configFiles: ConfigGroupsType,
) {
  const availableOptions = [];

  for (const [tool, files] of Object.entries(configFiles)) {
    for (const file of Object.keys(files)) {
      availableOptions.push({
        name: `${tool}: ${file}`,
        value: `${tool}_${file}`,
      });
    }
  }

  return availableOptions;
}
