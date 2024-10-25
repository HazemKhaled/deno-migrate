import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { Checkbox } from "https://deno.land/x/cliffy@v0.25.7/prompt/mod.ts";
import { migrateNpmScripts } from "./npm.ts";
import { writeDenoConfig } from "./utils.ts";
import existingDenoConfig from "../deno.json" with { type: "json" };
import type { DenoConfigType } from "./types.ts";

const cli = new Command()
  .name("deno-migrator")
  .version("1.0.0")
  .description("A CLI to migrate Node.js projects to Deno")
  .action(async () => {
    const options = await Checkbox.prompt({
      message: "Select the migrations you want to perform:",
      options: [
        { name: "package.json scripts", value: "scripts", checked: true },
        { name: ".prettierrc config", value: "prettier" },
        { name: "tsconfig config", value: "tsconfig" },
        { name: "ESLint config", value: "eslint" },
        { name: "package.json dependencies", value: "dependencies" },
      ],
    });

    let updatedDenoJson: DenoConfigType = { ...existingDenoConfig };

    if (options.includes("scripts")) {
      updatedDenoJson = await migrateNpmScripts(existingDenoConfig);
    }
    if (options.includes("prettier")) {
      console.log("🚧 Prettier migration not implemented yet.");
      // TODO: Implement Prettier migration logic here
    }
    if (options.includes("tsconfig")) {
      console.log("🚧 tsconfig migration not implemented yet.");
      // TODO: Implement tsconfig migration logic here
    }
    if (options.includes("eslint")) {
      console.log("🚧 ESLint migration not implemented yet.");
      // TODO: Implement ESLint migration logic here
    }
    if (options.includes("dependencies")) {
      console.log("🚧 Dependencies migration not implemented yet.");
      // TODO: Implement dependencies migration logic here
    }

    writeDenoConfig(updatedDenoJson);
    console.log("✅ Scripts migration completed and saved to deno.json");
  });

await cli.parse(Deno.args);
