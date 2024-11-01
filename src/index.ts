import { Command } from "jsr:@cliffy/command@1.0.0-rc.7";
import { Checkbox } from "jsr:@cliffy/prompt@1.0.0-rc.7";
import { join } from "jsr:@std/path@1.0.7";

import {
  getAvailableOptions,
  readDenoConfig,
  writeDenoConfig,
} from "#/utils/utils.ts";

import * as recipes from "#/recipes/index.ts";

import type { DenoConfigType } from "#/types.ts";

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
    workingDirectory = await Deno.realPath(workingDirectory);
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

    await performMigrations(selectedOptions, workingDirectory);
  });

async function performMigrations(
  selectedOptions: string[],
  workingDirectory: string,
) {
  const existingDenoConfig = await readDenoConfig({ workingDirectory });
  let updatedDenoJson: DenoConfigType = { ...existingDenoConfig };

  for (const option of selectedOptions) {
    const [tool, file] = option.split("_") as [keyof typeof recipes, string];
    const filePath = join(workingDirectory, file);

    if (!Object.keys(recipes).includes(tool)) {
      console.error(
        `❌ Migration for ${tool} is not supported yet, PRs are welcome.`,
      );
      continue;
    }

    console.log(`✅ Migrating ${tool} from ${file}...`);
    updatedDenoJson = await recipes[tool].migrate({
      file: filePath,
      existingDenoConfig: updatedDenoJson,
    });
  }

  writeDenoConfig({ workingDirectory, updatedDenoJson });
  console.log("✅ Scripts migration completed and saved to deno.json");
}

await cli.parse(Deno.args);
