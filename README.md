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
  - [x] Automatically detect configurations to migrate
  - [x] **Migrate package.json scripts to deno.json tasks**
  - [ ] **Migrate package.json dependencies to JSR imports** (Coming Soon)
  - [x] **Migrate Prettier configuration to deno.json** (Coming Soon)
  - [ ] **Migrate ESLint configuration to Deno lint rules** (Coming Soon)
  - [ ] **Migrate tsconfig.json to deno.json** (Coming Soon)

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
