import { assertEquals } from "jsr:@std/assert";

import {
  handleJsonFile,
  handleTextFile,
  mapRules,
  migrate,
} from "#recipes/prettier.ts";

import type {
  DenoConfigType,
  FmtOptionsType,
  PrettierType,
} from "../src/types.ts";

const prettierOptionsMock: Partial<PrettierType> = {
  useTabs: true,
  printWidth: 80,
  tabWidth: 4,
  semi: false,
  singleQuote: true,
  proseWrap: "preserve",
};
const denoFmtOptionsMock: Partial<FmtOptionsType> = {
  useTabs: true,
  lineWidth: 80,
  indentWidth: 4,
  semiColons: false,
  singleQuote: true,
  proseWrap: "preserve",
};

// Test for mapRules function with updated types
Deno.test("mapRules converts Prettier options to Deno fmt options", () => {
  const result = mapRules(prettierOptionsMock);

  assertEquals(result, denoFmtOptionsMock);
});

// Test for handleTextFile function with updated types
Deno.test("handleTextFile processes .prettierignore content", () => {
  const fileData = "node_modules\nbuild\n";
  const existingDenoConfig: DenoConfigType = {};

  const expected: DenoConfigType = {
    fmt: {
      exclude: ["node_modules", "build"],
    },
  };

  const result = handleTextFile(fileData, existingDenoConfig);

  assertEquals(result, expected);
});

// Test for handleJsonFile function with updated types
Deno.test("handleJsonFile processes Prettier config JSON", () => {
  const fileData = JSON.stringify(prettierOptionsMock as PrettierType);
  const existingDenoConfig: DenoConfigType = {};

  const expected: DenoConfigType = {
    fmt: {
      options: {
        ...denoFmtOptionsMock,
      },
    },
  };

  const result = handleJsonFile(fileData, existingDenoConfig);

  assertEquals(result, expected);
});

Deno.test("handleJsonFile handles invalid JSON", () => {
  const invalidJsonContent = "not a valid JSON string";
  try {
    handleJsonFile(invalidJsonContent, {});
  } catch (error) {
    assertEquals(error instanceof SyntaxError, true);
  }
});

// Test for migrate function handling Prettier config file
Deno.test("migrate handles Prettier config file correctly", async () => {
  const mockFile = "prettier.config.json";

  // Mock Deno.readTextFile
  const readTextFile = Deno.readTextFile;
  Deno.readTextFile = async () => await JSON.stringify(prettierOptionsMock);

  const existingDenoConfig: DenoConfigType = {};

  const expected: DenoConfigType = {
    fmt: {
      options: {
        ...denoFmtOptionsMock,
      },
    },
  };

  const result = await migrate({
    file: mockFile,
    existingDenoConfig,
  });

  assertEquals(result, expected);

  // Restore Deno.readTextFile
  Deno.readTextFile = readTextFile;
});
