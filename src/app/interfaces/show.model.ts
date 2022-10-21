import { IReview } from "./review.interface";
import { Review } from "./review.model";
import { IShow } from "./show.interface";

export class Show {
	public title: string;
	public urlTitle: string;
	public description: string;
	public imageUrl: string | null;
	public rating: number | null;
	public reviews: Array<Review>;

	constructor(show: IShow) {
		this.title = show.title;
		this.urlTitle = show.title.replaceAll(" ", "_");
		this.description = show.description;
		this.imageUrl = show.imageUrl;
		this.rating = show.rating;
		this.reviews = show.reviews.map((review: IReview) => new Review(review));
	}
}
