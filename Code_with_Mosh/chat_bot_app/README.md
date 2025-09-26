# chat_bot_app

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

### **Bun**

- [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
- This project was created using `bun init` in bun v1.2.22.

### **Shadcn**

- [Shadcn](https://ui.shadcn.com/docs/installation/vite) is a ui component
  library
- collection of customizable components

### **Prettier**

- code formatter
- define prettier formatting setting in .prettierrc:
    ```
     {
        "singleQuote": true, // use single quotes
        "semi": true,        // add semicolon at end of lines
        "trailingComma": "es5",
        "printWidth": 80,
        "tabWidth": 3
     }
    ```
- can also use commandline to reformat code:

    ```
     "format": "prettier --write ." // start from current directory
    ```

    - use .prettierignore to ignore formatting certain files

---

### **Layers**

- controllers (gateway) -> services (application logic) -> repositories (data)
    - controller receives a http request, validates it, then calls service to do
      the job, return http response

---

### **Prompt Engineering**

- Good prompt include:
    - instruction: tell model what to do (summarize, use bullet point, use
      simple language)
    - context: background information [role, context, audience, data]
        - guide tone + focus of response
    - output format: text? list? JSON? etc.
        - control length of output, formatting
