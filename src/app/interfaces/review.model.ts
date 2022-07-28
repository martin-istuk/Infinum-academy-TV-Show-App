import { IReview } from './review.interface';

export class Review {
	public id: string;
	public showId: string;
	public comment: string;
	public rating: number;

	constructor(review: IReview) {
		this.id = review.id;
		this.showId = review.show_id;
		this.comment = review.comment;
		this.rating = review.rating;
	}
}
