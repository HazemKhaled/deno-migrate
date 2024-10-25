import type { DenoConfigType } from "./types.ts";

export async function readDenoConfig(): Promise<DenoConfigType> {
  try {
    const denoJsonContent = await Deno.readTextFile("deno.json");
    return JSON.parse(denoJsonContent);
  } catch (_error) {
    console.log("deno.json not found, creating a new one...");
    // If the file doesn't exist, create and empty one
    writeDenoConfig({} as DenoConfigType);
    return {} as DenoConfigType;
  }
}

export async function writeDenoConfig(updatedDenoJson: DenoConfigType) {
  try {
    await Deno.writeTextFile(
      "deno.json",
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
