import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';
import template from '../prompts/chatbot.txt';

// Implementation details
const endpoint = 'https://models.github.ai/inference';
const client = new OpenAI({
    baseURL: endpoint, // need this baseURL to work with github model
    apiKey: process.env.OPENAI_API_KEY,
});

const parkInfo = fs.readFileSync(
    path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
    'utf-8'
);
const instruction = template.replace('{{parkInfo}}', parkInfo);
const systemMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
    role: 'system',
    content: instruction,
};

type ChatResponse = {
    id: string;
    message: string | null | undefined;
};

// public interface
// hide complexity of LLM model and make code easy to switch out
export const chatService = {
    async sendMessage(
        prompt: string,
        conversationId: string
    ): Promise<ChatResponse> {
        const history =
            conversationRepository.getConversationHistory(conversationId);

        // Add the user's message
        history.push({ role: 'user', content: prompt });

        // add instruction + history to pass to model
        const messagesToSend = [systemMessage, ...history];

        // send prompt to openai
        const response = await client.chat.completions.create({
            messages: messagesToSend,
            temperature: 0.2,
            max_tokens: 100,
            model: 'openai/gpt-4o-mini',
        });

        // Save updated history
        conversationRepository.setConversationHistory(conversationId, history);

        return {
            id: response.id,
            message: response.choices?.[0]?.message?.content,
        };
    },
};
