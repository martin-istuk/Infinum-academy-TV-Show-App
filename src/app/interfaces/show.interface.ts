import { IReview } from './review.interface';

export interface IShow {
	id: number;
	title: string;
	description: string;
	average_rating: number | null;
	image_url: string | null;
	reviews: Array<IReview>;
}
