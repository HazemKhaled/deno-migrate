export type FmtOptionsType = {
  useTabs?: boolean;
  lineWidth?: number;
  indentWidth?: number;
  semiColons?: boolean;
  singleQuote?: boolean;
  proseWrap?: "always" | "never" | "preserve";
  include?: string[];
  exclude?: string[];
};

export type DenoConfigType = {
  name?: string;
  version?: string;
  exports?: string;
  tasks?: Record<string, string>;
  imports?: Record<string, string>;
  fmt?: {
    options: FmtOptionsType;
  };
};

export type PrettierType = {
  useTabs?: boolean;
  printWidth?: number;
  tabWidth?: number;
  semi?: boolean;
  singleQuote?: boolean;
  proseWrap?: "always" | "never" | "preserve";
};

export type ConfigGroupsType = Record<string, Record<string, string>>;
