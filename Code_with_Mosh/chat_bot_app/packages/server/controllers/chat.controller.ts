import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import z from 'zod';

// implementation details
const chatSchema = z.object({
   prompt: z
      .string()
      .trim() // get rid of white spaces
      .min(1, 'Prompt is required.')
      .max(1000, 'Prompt is too long (max 1000 characters)'),
   conversationId: z.string().uuid(),
});

// public interface
export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const parseResult = chatSchema.safeParse(req.body); // get user prompt from request body
      if (!parseResult.success) {
         return res.status(400).json(parseResult.error.format());
      }

      try {
         const { prompt, conversationId } = req.body;
         const response = await chatService.sendMessage(prompt, conversationId);

         res.json({ message: response.message });
      } catch (error) {
         res.status(500).json({ error: 'Failed to generate a response' });
      }
   },
};
