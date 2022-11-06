import { IReview } from "./review.interface";

export interface IShow {
	title: string;
	urlTitle: string;
	description: string;
	imageUrl: string | null;
	reviews: Array<IReview>;
	rating: number | null;
}
