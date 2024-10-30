import { assert, assertEquals } from "jsr:@std/assert";

import { handleJsonFile } from "#recipes/prettier.ts";

import type { FmtOptionsType } from "../src/types.ts";

Deno.test("handleJsonFile processes JSON correctly", () => {
  const prettierJsonMock = JSON.stringify({
    useTabs: true,
    printWidth: 80,
    tabWidth: 4,
    semi: false,
    singleQuote: true,
  });
  const result = handleJsonFile(prettierJsonMock, {});

  assert(result.fmt);
  assertPrettierOptions(result.fmt.options);
});

Deno.test("handleJsonFile handles invalid JSON", () => {
  const invalidJsonContent = '{"key": "value"';
  try {
    handleJsonFile(invalidJsonContent, {});
  } catch (error) {
    assertEquals(error instanceof SyntaxError, true);
  }
});

// Deno.test("handleTextFile processes text correctly", () => {
//   const prettierTextMock =
//     `useTabs: true\nprintWidth: 80\ntabWidth: 4\nsemi: false\nsingleQuote: true`;
//   const result = handleTextFile(prettierTextMock, {});

//   assert(result.fmt);
//   assertPrettierOptions(result.fmt.options);
// });

function assertPrettierOptions(options: FmtOptionsType) {
  assertEquals(options.useTabs, true);
  assertEquals(options.lineWidth, 80);
  assertEquals(options.indentWidth, 4);
  assertEquals(options.semiColons, false);
  assertEquals(options.singleQuote, true);
}
