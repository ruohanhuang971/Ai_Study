import type { Request, Response } from 'express';
import { summarizerService } from '../services/summarizer.service';
import { productRepository } from '../repository/product.repository';
import { summarizerRepository } from '../repository/summarizer.repository';

export const summarizerController = {
    async getProductReviews(req: Request, res: Response) {
        try {
            const productId = Number(req.params.id);

            // is validate input
            if (isNaN(productId)) {
                return res.status(400).json({ error: 'Invalid product ID.' });
            }
            // is valid product
            const product = await productRepository.getProduct(productId);
            if (!product) {
                return res
                    .status(404)
                    .json({ error: 'Product does not exist.' });
            }

            const reviews = await summarizerRepository.getProductReviews(
                productId
            );
            const summary = await summarizerRepository.getReviewSummary(
                productId
            );

            res.json({ summary, reviews });
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
        // is valid product
        const product = await productRepository.getProduct(productId);
        if (!product) {
            return res.status(400).json({ error: 'Invalid product.' });
        }

        // if product has no reviews
        const review = await summarizerRepository.getProductReviews(
            productId,
            1
        );
        if (review.length === 0) {
            return res.status(400).json({
                error: 'There are no reviews to summarize.',
            });
        }

        const summary = await summarizerService.summarizeReviews(productId);

        res.json({ summary });
    },
};
