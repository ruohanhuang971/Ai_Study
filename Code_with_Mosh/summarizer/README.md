# summarizer

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.22. [Bun](https://bun.com)
is a fast all-in-one JavaScript runtime.

Projects uses:

-   Mysql
-   prisma

    -   in server folder run command

        ```
        bun add prisma
        bun add @prisma/client

        bunx prisma init
        ```

    -   define prisma schema in schema.prisma
    -   make a new prisma migration
        ```
        bunx prisma migrate dev
        ```

-   @tanstack/react-query:
    -   automatic retries when query fails
    -   cache query
