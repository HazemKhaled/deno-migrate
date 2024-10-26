import { join } from "https://deno.land/std/path/mod.ts";
import type { DenoConfigType } from "./types.ts";

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
