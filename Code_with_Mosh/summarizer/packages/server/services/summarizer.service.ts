import { type Review } from '../generated/prisma';
import { llmClient } from '../llm/client';
import { summarizerRepository } from '../repository/summarizer.repository';
import template from '../prompt/summarizer-review.txt';

export const summarizerService = {
    async getProductReviews(productId: number): Promise<Review[]> {
        return summarizerRepository.getProductReviews(productId);
    },

    async summarizeReviews(productId: number): Promise<string> {
        // get the last 10 reviews
        const reviews = await summarizerRepository.getProductReviews(
            productId,
            10
        );
        // join into large string to send into LLM
        const joinedReviews = reviews.map((r) => r.content).join('\n\n');

        // generate prompt
        const prompt = template.replace('{{reviews}}', joinedReviews);

        // generate summary with openai
        const summary = await llmClient.generateText({
            prompt,
            temperature: 0.2,
            maxTokens: 300,
            model: 'openai/gpt-4.1',
        });

        // store summary to database
        await summarizerRepository.storeReviewSummary(productId, summary);

        return summary;
    },
};
