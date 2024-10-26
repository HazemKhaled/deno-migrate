import type { IntegerType } from "jsr:@cliffy/command@1.0.0-rc.7";

export type DenoConfigType = {
  name?: string;
  version?: string;
  exports?: string;
  tasks?: {
    [key: string]: string;
  };
  imports?: {
    [key: string]: string;
  };
  fmt?: {
    options: {
      useTabs: boolean;
      lineWidth: number;
      indentWidth: number;
      semiColons: boolean;
      singleQuote: boolean;
      proseWrap: "preserve" | "always" | "never";
      include?: string[];
      exclude?: string[];
    };
  };
};

export type GlobalConfigType = Record<string, string | boolean | IntegerType>;
