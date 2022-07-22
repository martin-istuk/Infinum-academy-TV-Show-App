import { IShow } from './show.interface';
import { Review } from './review.model';
import { IReview } from './review.interface';

export class Show {
	public id: string;
	public title: string;
	public description: string;
	public averageRating: number | null;
	public imageUrl: string | null;
	public reviews: Array<Review>;

	constructor(show: IShow) {
		this.id = show.id;
		this.title = show.title;
		this.description = show.description;
		this.averageRating = show.average_rating;
		this.imageUrl = show.image_url;
		this.reviews = show.reviews.map((review: IReview) => {
			return new Review(review);
		});
	}
}
