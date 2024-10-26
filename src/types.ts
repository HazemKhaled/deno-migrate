import { IntegerType } from "jsr:@cliffy/command@1.0.0-rc.7";

import denoConfig from "../deno.json" with { type: "json" };

export type DenoConfigType = typeof denoConfig;

export type GlobalConfigType = Record<string, string | boolean | IntegerType>;
