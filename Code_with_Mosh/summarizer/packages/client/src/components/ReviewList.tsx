import axios from 'axios';
import StarRating from './StarRating';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@tanstack/react-query';
import { Button } from './ui/button';
import { HiSparkles } from 'react-icons/hi';
import { useState } from 'react';
import ReviewSkeleton from './ReviewSkeleton';

type Props = {
    productId: number;
};

type Review = {
    id: number;
    author: string;
    content: string;
    rating: number;
    createdAt: string;
};

type GetReviewsResponse = {
    summary: string | null;
    reviews: Review[];
};

type SummarizeResponse = {
    summary: string;
};

const ReviewList = ({ productId }: Props) => {
    const [summary, setSummary] = useState('');
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);

    // use this library replaces useState and useEffect
    const {
        data: reviewData,
        isLoading,
        error,
    } = useQuery<GetReviewsResponse>({
        queryKey: ['reviews', productId],
        queryFn: () => fetchReviews(),
    });

    const fetchReviews = async () => {
        const { data } = await axios.get<GetReviewsResponse>(
            `/api/v1/products/${productId}/reviews`
        );
        return data;
    };

    const handleSummarize = async () => {
        setIsSummaryLoading(true);

        const { data } = await axios.post<SummarizeResponse>(
            `/api/v1/products/${productId}/reviews/summarize`
        );

        setSummary(data.summary);
        setIsSummaryLoading(false);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col gap-5">
                {[1, 2, 3].map((p) => (
                    <div key={p}>
                        <ReviewSkeleton key={p} />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <p className="text-red-500">
                {'Could not fetch reviews. Try again'}
            </p>
        );
    }

    // render blank page if there are no reviews
    if (!reviewData?.reviews.length) {
        return null;
    }

    const currentSummary = reviewData.summary || summary;

    return (
        <div>
            {/* summary */}
            <div className="mb-5">
                {currentSummary ? (
                    <p>{currentSummary}</p>
                ) : (
                    <div>
                        <Button
                            onClick={handleSummarize}
                            className="cursor-pointer"
                            disabled={isSummaryLoading}
                        >
                            <HiSparkles /> Summarize
                        </Button>
                        <div className="py-3">
                            {isSummaryLoading && <ReviewSkeleton />}
                        </div>
                    </div>
                )}
            </div>

            {/* reviews */}
            <div className="flex flex-col gap-5">
                {reviewData?.reviews.map((review) => (
                    <div key={review.id}>
                        <div className="font-semibold">{review.author}</div>
                        <div>
                            <StarRating value={review.rating} />
                        </div>
                        <p className="py-2">{review.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
