import type { IntegerType } from "jsr:@cliffy/command@1.0.0-rc.7";

export type TaskType = Record<string, string>;

export type ImportType = Record<string, string>;

export type FmtOptionsType = {
  useTabs: boolean;
  lineWidth: number;
  indentWidth: number;
  semiColons: boolean;
  singleQuote: boolean;
  proseWrap: "preserve" | "always" | "never";
  include?: string[];
  exclude?: string[];
};

export type FmtType = {
  options: FmtOptionsType;
};

export type DenoConfigType = {
  name?: string;
  version?: string;
  exports?: string;
  tasks?: TaskType;
  imports?: ImportType;
  fmt?: FmtType;
};

export type GlobalConfigType = Record<string, string | boolean | IntegerType>;
