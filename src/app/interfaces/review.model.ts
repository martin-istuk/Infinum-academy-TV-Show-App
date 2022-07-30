import { IReview } from './review.interface';

export class Review {
	public id: string;
	public showId: string;
	public comment: string;
	public rating: number;
	public user: {
		id: string;
		email: string;
		imageUrl: string | null;
	};

	constructor(review: IReview) {
		this.id = review.id;
		this.showId = review.show_id;
		this.comment = review.comment;
		this.rating = review.rating;
		this.user = {
			id: review.user.id,
			email: review.user.email,
			imageUrl: review.user.image_url,
		};
	}
}
