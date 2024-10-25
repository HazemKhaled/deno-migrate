import type { DenoConfigType } from "./types.ts";

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
