export type FmtOptionsType = {
  useTabs?: boolean;
  lineWidth?: number;
  indentWidth?: number;
  semiColons?: boolean;
  singleQuote?: boolean;
  proseWrap?: "always" | "never" | "preserve";
};

export type DenoConfigFmtType = {
  options?: FmtOptionsType;
  include?: string[];
  exclude?: string[];
};

export type DenoConfigType = {
  name?: string;
  version?: string;
  exports?: string;
  tasks?: Record<string, string>;
  imports?: Record<string, string>;
  fmt?: DenoConfigFmtType;
  compilerOptions?: Record<string, string>;
};

export type PrettierType = {
  useTabs?: boolean;
  printWidth?: number;
  tabWidth?: number;
  semi?: boolean;
  singleQuote?: boolean;
  proseWrap?: "always" | "never" | "preserve";

  // Unsupported options by deno fmt
  arrowParens: "avoid" | "always";
  bracketSpacing: boolean;
  htmlWhitespaceSensitivity: "css" | "strict" | "ignore";
  insertPragma: boolean;
  jsxBracketSameLine: boolean;
  jsxSingleQuote: boolean;
  quoteProps: "as-needed" | "consistent" | "preserve";
  requirePragma: boolean;
  trailingComma: "none" | "es5" | "all";
};

export type ConfigGroupsType = Record<string, Record<string, string>>;
