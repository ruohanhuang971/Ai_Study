import type { Request, Response } from 'express';
import { summarizerService } from '../services/summarizer.service';
import type { Review } from '../generated/prisma';

export const summarizerController = {
    async getProductReviews(req: Request, res: Response) {
        try {
            const productId = Number(req.params.id);

            // validate input
            if (isNaN(productId)) {
                return res.status(400).json({ error: 'Invalid product ID.' });
            }

            const reviews = await summarizerService.getProductReviews(
                productId
            );
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get reviews' });
        }
    },
    async summarizeReviews(req: Request, res: Response) {
        const productId = Number(req.params.id);

        // validate input
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid product ID.' });
        }

        const summary = await summarizerService.summarizeReviews(productId);

        res.json({ summary });
    },
};
