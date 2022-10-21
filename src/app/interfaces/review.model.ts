import { IReview } from "./review.interface";

export class Review {
	public email: string;
	public comment: string;
	public rating: number;

	constructor(review: IReview) {
		this.email = review.email;
		this.comment = review.comment;
		this.rating = review.rating;
	}
}
