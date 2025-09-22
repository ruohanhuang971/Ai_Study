# chat_bot_app

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## **Bun**

- [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
- This project was created using `bun init` in bun v1.2.22.

## **Shadcn**

- [Shadcn](https://ui.shadcn.com/docs/installation/vite) is a ui component library
- collection of customizable components

## **Prettier**

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

## **Husky**

- [husky](https://typicode.github.io/husky/) automatically lint commit messages, code, and run tests upon committing or pushing.

## **lint-staged**

- preform tasks on staged files
