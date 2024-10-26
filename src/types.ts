import type { IntegerType } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import denoConfig from "../deno.json" with { type: "json" };

export type DenoConfigType = typeof denoConfig;

export type GlobalConfigType = Record<string, string | boolean | IntegerType>;
