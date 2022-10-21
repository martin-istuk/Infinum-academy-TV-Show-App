import { IReview } from "./review.interface";

export interface IShow {
	title: string;
	urlTitle: string;
	description: string;
	imageUrl: string | null;
	rating: number | null;
	reviews: Array<IReview>;
}
