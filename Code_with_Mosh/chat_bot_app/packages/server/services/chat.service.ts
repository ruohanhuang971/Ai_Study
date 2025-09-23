import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';

// Implementation details
const endpoint = 'https://models.github.ai/inference';
const client = new OpenAI({
   baseURL: endpoint, // need this baseURL to work with github model
   apiKey: process.env.OPENAI_API_KEY,
});

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

      // send prompt to openai
      const response = await client.chat.completions.create({
         messages: history,
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
