// responsible for talking to the backend
import axios from 'axios';

export type Review = {
    id: number;
    author: string;
    content: string;
    rating: number;
    createdAt: string;
};

export type GetReviewsResponse = {
    summary: string | null;
    reviews: Review[];
};

export type SummarizeResponse = {
    summary: string;
};

export const reviewApi = {
    async fetchReviews(productId: number) {
        const { data } = await axios.get<GetReviewsResponse>(
            `/api/v1/products/${productId}/reviews`
        );
        return data;
    },

    async summarizeReview(productId: number) {
        const { data } = await axios.post<SummarizeResponse>(
            `/api/v1/products/${productId}/reviews/summarize`
        );
        return data;
    },
};
