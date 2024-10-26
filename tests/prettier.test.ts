import { assert, assertEquals } from "jsr:@std/assert";
import { handleJsonFile } from "../src/prettier.ts";

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
  assertEquals(result.fmt.options.useTabs, true);
  assertEquals(result.fmt.options.lineWidth, 80);
  assertEquals(result.fmt.options.indentWidth, 4);
  assertEquals(result.fmt.options.semiColons, false);
  assertEquals(result.fmt.options.singleQuote, true);
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
//   assertEquals(result.fmt.options.useTabs, true);
//   assertEquals(result.fmt.options.lineWidth, 80);
//   assertEquals(result.fmt.options.indentWidth, 4);
//   assertEquals(result.fmt.options.semiColons, false);
//   assertEquals(result.fmt.options.singleQuote, true);
// });
