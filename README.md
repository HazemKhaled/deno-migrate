# Deno Migrate

### 🚀 Simplify Your Node.js Project Migration to Deno

This CLI helps developers migrate their **Node.js projects** to **Deno** by
converting configurations like `package.json` scripts, dependencies, Prettier,
ESLint, and more. It takes advantage of **Deno’s native tools** to eliminate the
need for external ones such as **npm**, **Prettier**, and **ESLint**.

---

## 📋 Features

- **Interactive Migration Options:** Select the parts of your project you want
  to migrate using a checklist.
- **Current Status:**

### `deno.json`

|    |                                          |
| -- | ---------------------------------------- |
| ✅ | Detect configuration files automatically |
| ❌ | List unsupported configurations          |
| ❌ | Post Migration                           |

### `package.json`

|    |                                                  |
| -- | ------------------------------------------------ |
| ✅ | Migrate scripts to Deno tasks                    |
| ❌ | Migrate NPM packages to JSR                      |
| ❌ | List unsupported properties left in package.json |
| ❌ | Cleanup package.json post migration              |

### Typescript

|    |                                    |
| -- | ---------------------------------- |
| ✅ | Migrate tsconfig.json to deno.json |

### Prettier

|    |                                                     |
| -- | --------------------------------------------------- |
| ✅ | Migrate Prettier configuration to Deno FMT          |
| ✅ | Migrate .prettierignore                             |
| ✅ | Support all .prettier files                         |
| ✅ | List unsupported properties left in .prettierrc     |
| ❌ | Remove Prettier configuration file and dependencies |

### ESLint

|    | Feature                                           |
| -- | ------------------------------------------------- |
| ❌ | Migrate ESLint configuration to Deno lint rules   |
| ❌ | List unsupported properties left in .eslintrc     |
| ❌ | Remove ESLint configuration file and dependencies |
| ❌ | Support ESLint 9                                  |
| ❌ | Map ESLint rules to Deno lint rules               |

---

## 📖 Usage

### **Interactive Mode**

Run the following command to start the interactive migration process:

```bash
deno run -A https://deno.land/x/deno_migrate@latest
```

Pass workingDirectory to check for a sub directory

```bash
deno run -A https://deno.land/x/deno_migrate@latest --workingDirectory = ~/projects/project-x
```

You will see:

```
Select the migrations you want to perform:
[ ] package.json scripts
[ ] package.json dependencies
[ ] .prettier config
[ ] ESLint config
[ ] tsconfig config
```

Use the **arrow keys** and **spacebar** to select options, then press **Enter**.
The CLI will run only the selected migrations and display the results.

---

## 📦 Example Project Structure

Given the following **Node.js project**:

```
my-node-project/
├── package.json
├── .prettierrc
├── .eslintrc.json
├── tsconfig.json
└── index.js
```

After running the CLI, your **deno.json** will contain the necessary tasks and
configurations, making the project ready for Deno.

---

## 🌲 Project Structure

```
deno-migrate-cli/
├── src/
│   ├── index.ts           # Main CLI entry point
│   └── utils.ts           # Utility functions for migrations
├── deno.json              # Deno configuration file (output)
└── README.md              # Project documentation
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch-name
   ```
5. Submit a pull request.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

---

## ⭐ Contributors

<a href="https://github.com/HazemKhaled/deno-migrate/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=HazemKhaled/deno-migrate" />
</a>
