import { Command } from "jsr:@cliffy/command@1.0.0-rc.7";
import { Checkbox } from "jsr:@cliffy/prompt@1.0.0-rc.7";
import { migrateNpmScripts } from "./npm.ts";
import {
  getAvailableOptions,
  readDenoConfig,
  writeDenoConfig,
} from "./utils.ts";
import type { DenoConfigType } from "./types.ts";

const cli = new Command()
  .name("deno-migrator")
  .version("1.0.0")
  .description("A CLI to migrate Node.js projects to Deno")
  .option(
    "-d, --workingDirectory <directory:string>",
    "Set the working directory",
    { default: Deno.cwd() },
  )
  .action(async ({ workingDirectory }) => {
    console.log("🚧 Welcome to Deno Migrator CLI 🚧", workingDirectory);

    const availableOptions = await getAvailableOptions(workingDirectory);

    if (availableOptions.length === 0) {
      console.log(
        "No configuration files found for migration. " + workingDirectory,
      );
      return;
    }

    const selectedOptions = await Checkbox.prompt({
      message: "Select the migrations you want to perform:",
      options: availableOptions,
    });

    // Get the deno.json file and update it with the new scripts
    const existingDenoConfig = await readDenoConfig({ workingDirectory });
    let updatedDenoJson: DenoConfigType = { ...existingDenoConfig };

    for (const option of selectedOptions) {
      const [tool, file] = option.split("_");

      switch (tool) {
        case "npm":
          console.log(`Migrating npm scripts from ${file}...`);
          updatedDenoJson = await migrateNpmScripts({
            file: workingDirectory + file,
            existingDenoConfig,
          });
          break;
        case "prettier":
          console.warn("🚧 Prettier migration not implemented yet.");
          // TODO: Implement Prettier migration logic here
          break;
        case "typescript":
          console.warn("🚧 tsconfig migration not implemented yet.");
          // TODO: Implement tsconfig migration logic here
          break;
        case "eslint":
          console.warn("🚧 ESLint migration not implemented yet.");
          // TODO: Implement ESLint migration logic here
          break;
        default:
          console.error(`Unknown option: ${option}`);
      }
    }

    writeDenoConfig({ workingDirectory, updatedDenoJson });
    console.log("✅ Scripts migration completed and saved to deno.json");
  });

await cli.parse(Deno.args);
