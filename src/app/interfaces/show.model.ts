import { IReview } from "./review.interface";
import { Review } from "./review.model";
import { IShow } from "./show.interface";

export class Show {
	public title: string;
	public urlTitle: string;
	public description: string;
	public imageUrl: string | null;
	public reviews: Array<Review>;
	public rating: number | null;

	constructor(show: IShow) {
		this.title = show.title;
		this.urlTitle = show.title.replaceAll(" ", "_");
		this.description = show.description;
		this.imageUrl = show.imageUrl;
		this.reviews = show.reviews.map((review: IReview) => new Review(review));
		this.rating =
			show.reviews
				.map((review: Review) => review.rating)
				.reduce((previousValue, currentValue) => previousValue + currentValue) / this.reviews.length;
	}
}
