## **What is a token?**

-   Instead of processing the input as plain text, the model breaks it down into
    smaller units called tokens
    -   Example: words, parts of words, punctuations, etc
-   Cost is calculated by token. Generating token cost money.

**How to choose a model**

-

1. Reasoning:
    - model that need to solve a complex problem need stronger reasoning
    - model that does a simple task [extract text, classify, summarize], need
      smaller model
2. Speed:
    - depends on how fast a response is needed [ie: real time response need
      smaller model]
    - bigger models are usually slower while smaller models are faster
3. Modalities:
    - what kind of output and input is the model expecting
    - for models that takes input that isn't just text need LMMs (Large
      multi-modal models)
4. Cost:
    - based on # of tokens
5. Context window:
    - how many token a model can handel at once
    - includes prompt, model's response, and the chat history
    - ex: to summarize large document need, need model with large context window
6. Privacy:
    - for private information, like patient records, need to use open-source,
      self-hosted models instead of commercial models

**Properties**

-   **Temperature**
-   determines how "creative" the model is when generating answers
    -   0.2 - 0.4 for logical, precise answer [ex: summary/factual answer]
    -   0.7 - 1.0 for creative/expressive tasks [ex: brainstorming]
-   don't use extreme values like 0.0 or 2.0

**Top_P**

-   control randomness
    -   Top_P == 1, the model can use any of the possible next tokens to
        generate response
    -   Top_P == 0.3, model only focuses only on the most likely words

**Summary**

-   usually only change temperature or top_p
-   if not sure, change temperature and set top_p = 1.0

# Tool

-   **bun**: all-in-one JavaScript runtime & toolkit designed for speed,
    complete with a bundler, test runner, and Node.js-compatible package manager
    ```
        bun init                    // node init
        bun add                     // npm install
        bun rum index.ts            // node index.js
        bun --watch run index.ts    // nodemon index.js
    ```
-   create project structure

    -   in project folder
        ```
        bun init
        ```
    -   add packages folder with server and client folder
    -   in package.json add lines
        ```json
        "workspaces": [
          "packages/*"
        ]
        ```
    -   in server dir:
        ```
        bun init
        bun add express
        bun add -d @types/express
        ```
    -   in client dir:
        ```
        bun create vite .
        ```
    -   in vite.config.ts
        ```js
        export default defineConfig({
            // ...
            server: {
                proxy: {
                    '/api': 'http://localhost:3000',
                },
            },
        });
        ```
    -   in project folder
        ```
        bun add -d concurrently
        ```
    -   in index.ts in project folder

        ```js
        import concurrently from 'concurrently';

        concurrently([
            {
                name: 'server',
                command: 'bun run dev',
                cwd: 'packages/server',
                prefixColor: 'cyan',
            },
            {
                name: 'client',
                command: 'bun run dev',
                cwd: 'packages/client',
                prefixColor: 'green',
            },
        ]);
        ```

    -   in project file package.json
        ```json
        "script": {
          "dev": "bun run index.ts"
        }
        ```
