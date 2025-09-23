import OpenAI from 'openai';

// Stores messages per conversation ID
// implementation details. don't export
const conversations = new Map<
   string,
   OpenAI.Chat.Completions.ChatCompletionMessageParam[]
>();

// export public interface (keep implementation details private)
export const conversationRepository = {
   getConversationHistory(conversationId: string) {
      return conversations.get(conversationId) || [];
   },

   setConversationHistory(
      conversationId: string,
      history: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
   ) {
      conversations.set(conversationId, history);
   },
};
