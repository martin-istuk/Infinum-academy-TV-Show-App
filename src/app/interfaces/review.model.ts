import { IReview } from './review.interface';

export class Review {
	public id: string;
	public comment: string;
	public rating: number;

	constructor(review: IReview) {
		this.id = review.id;
		this.comment = review.comment;
		this.rating = review.rating;
	}
}
