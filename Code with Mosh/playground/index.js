// # COUNTING TOKENS
// import { get_encoding } from "tiktoken";

// // encoding are dictionaries that map token ID -> tokens 
// // ex: 904 -> hello
// const encoding = get_encoding('cl100k_base');
// const token = encoding.encode('Hello word! This is first test with get_encoding');
// console.log(token); // [ 9906, 3492, 0, 1115, 374, 1176, 1296, 449, 636, 38713]

import OpenAI from "openai";

const OPENAI_API_KEY = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

const client = new OpenAI({ baseURL: endpoint, apiKey: OPENAI_API_KEY });

const stream = await client.chat.completions.create({
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Write a story about a robot" }
    ],
    temperature: 0.7,
    top_p: 1.0,
    model: model,
    stream: true
});

// stream: async iterable
// event is generated at runtime not all at once, hence await
for await (const event of stream) {
    process.stdout.write(event.choices[0]?.delta?.content || "");
}

