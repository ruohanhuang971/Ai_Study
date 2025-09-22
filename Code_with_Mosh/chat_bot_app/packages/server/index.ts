import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import z from 'zod';

dotenv.config();

const endpoint = 'https://models.github.ai/inference';
const client = new OpenAI({
   baseURL: endpoint, // need this baseURL to work with github model
   apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
   res.send('Hello World! AHHHHHHHHHH');
});

app.get('/api/v1/hello', (req: Request, res: Response) => {
   res.json({ message: 'hello' });
});

// Stores messages per conversation ID
const conversations = new Map<
   string,
   OpenAI.Chat.Completions.ChatCompletionMessageParam[]
>();

const chatSchema = z.object({
   prompt: z
      .string()
      .trim() // get rid of white spaces
      .min(1, 'Prompt is required.')
      .max(1000, 'Prompt is too long (max 1000 characters)'),
   conversationId: z.string().uuid(),
});

app.post('/api/v1/chat', async (req: Request, res: Response) => {
   const parseResult = chatSchema.safeParse(req.body); // get user prompt from request body
   if (!parseResult.success) {
      return res.status(400).json(parseResult.error.format());
   }

   try {
      const { prompt, conversationId } = req.body;

      const history = conversations.get(conversationId) || [];

      // Add the user's message
      history.push({ role: 'user', content: prompt });

      // send prompt to openai
      const response = await client.chat.completions.create({
         messages: history,
         temperature: 0.2,
         max_tokens: 100,
         model: 'openai/gpt-4o-mini!',
      });

      // Save updated history
      conversations.set(conversationId, history);

      res.json({ message: response.choices?.[0]?.message?.content });
   } catch (error) {
      res.status(500).json({ error: 'Failed to generate a response' });
   }
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}...`);
});
