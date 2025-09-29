import axios from 'axios';
import StarRating from './StarRating';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@tanstack/react-query';

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

const ReviewList = ({ productId }: Props) => {
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

    if (isLoading) {
        return (
            <div className="flex flex-col gap-5">
                {[1, 2, 3].map((p) => (
                    <div key={p}>
                        <Skeleton width={150} />
                        <Skeleton width={100} />
                        <Skeleton count={2} />
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

    return (
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
    );
};

export default ReviewList;
