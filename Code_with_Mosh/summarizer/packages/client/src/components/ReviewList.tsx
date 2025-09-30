import StarRating from './StarRating';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from './ui/button';
import { HiSparkles } from 'react-icons/hi';
import ReviewSkeleton from './ReviewSkeleton';
import {
    reviewApi,
    type GetReviewsResponse,
    type SummarizeResponse,
} from './reviewsApi';

type Props = {
    productId: number;
};

const ReviewList = ({ productId }: Props) => {
    // use this library replaces useState and useEffect
    const reviewsQuery = useQuery<GetReviewsResponse>({
        queryKey: ['reviews', productId],
        queryFn: () => reviewApi.fetchReviews(productId),
    });

    const summaryMutation = useMutation<SummarizeResponse>({
        mutationFn: () => reviewApi.summarizeReview(productId),
    });

    if (reviewsQuery.isLoading) {
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

    if (reviewsQuery.isError) {
        return (
            <p className="text-red-500">
                {'Could not fetch reviews. Try again'}
            </p>
        );
    }

    // render blank page if there are no reviews
    if (!reviewsQuery.data?.reviews.length) {
        return null;
    }

    const currentSummary =
        reviewsQuery.data.summary || summaryMutation.data?.summary;

    return (
        <div>
            {/* summary */}
            <div className="mb-5">
                {currentSummary ? (
                    <p>{currentSummary}</p>
                ) : (
                    <div>
                        <Button
                            onClick={() => summaryMutation.mutate()}
                            className="cursor-pointer"
                            disabled={summaryMutation.isPending}
                        >
                            <HiSparkles /> Summarize
                        </Button>

                        {summaryMutation.isPending && (
                            <div className="py-3">
                                <ReviewSkeleton />
                            </div>
                        )}

                        {summaryMutation.isError && (
                            <p className="text-red-500">
                                Could not summarize the reviews. Please try
                                again later.
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* reviews */}
            <div className="flex flex-col gap-5">
                {reviewsQuery.data?.reviews.map((review) => (
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
