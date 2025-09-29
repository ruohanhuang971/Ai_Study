import OpenAI from 'openai';

// hide complexity of talking to LLM
const endpoint = 'https://models.github.ai/inference';
const client = new OpenAI({
    baseURL: endpoint, // need this baseURL to work with github model
    apiKey: process.env.OPENAI_API_KEY,
});

type GenerateTextOptions = {
    model?: string;
    prompt: string;
    temperature?: number;
    maxTokens?: number;
};

export const llmClient = {
    async generateText({
        model = 'gtp-4.1',
        prompt,
        temperature = 0.2,
        maxTokens = 300,
    }: GenerateTextOptions) {
        const response = await client.chat.completions.create({
            messages: [{ role: 'system', content: prompt }],
            temperature: temperature,
            max_tokens: maxTokens,
            model: model,
        });

        return response.choices?.[0]?.message?.content || '';
    },
};
