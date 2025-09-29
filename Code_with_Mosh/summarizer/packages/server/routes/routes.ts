import express from 'express';
import type { Request, Response } from 'express';
import { summarizerController } from '../controller/summarizer.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

router.get('/api/v1/hello', (req: Request, res: Response) => {
    res.json({ message: 'hello' });
});

router.get(
    '/api/v1/products/:id/reviews',
    summarizerController.getProductReviews
);

router.post(
    '/api/v1/products/:id/reviews/summarize',
    summarizerController.summarizeReviews
);

export default router;
