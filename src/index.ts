import { Command } from "jsr:@cliffy/command@1.0.0-rc.7";
import { Checkbox } from "jsr:@cliffy/prompt@1.0.0-rc.7";
import { migrateNpmScripts } from "./npm.ts";
import { readDenoConfig, writeDenoConfig } from "./utils.ts";
import type { DenoConfigType } from "./types.ts";
import { migratePrettierScripts } from "./prettier.ts";

const cli = new Command()
  .name("deno-migrator")
  .version("1.0.0")
  .description("A CLI to migrate Node.js projects to Deno")
  .option(
    "-d, --workingDirectory <directory:string>",
    "Set the working directory",
    {
      default: Deno.cwd(),
    },
  )
  .action(async ({ workingDirectory }) => {
    workingDirectory = await Deno.realPath(workingDirectory);

    console.log("🚧 Welcome to Deno Migrator CLI 🚧", workingDirectory);
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

    // Get the deno.json file and update it with the new scripts
    const existingDenoConfig = await readDenoConfig({ workingDirectory });
    let updatedDenoJson: DenoConfigType = { ...existingDenoConfig };

    // Migrate the npm scripts to deno tasks
    if (options.includes("scripts")) {
      updatedDenoJson = await migrateNpmScripts({
        workingDirectory,
        existingDenoConfig,
      });
    }
    if (options.includes("prettier")) {
        updatedDenoJson = await migratePrettierScripts({
            workingDirectory,
            existingDenoConfig
        })
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

    writeDenoConfig({ workingDirectory, updatedDenoJson });
    console.log("✅ Scripts migration completed and saved to deno.json");
  });

await cli.parse(Deno.args);
