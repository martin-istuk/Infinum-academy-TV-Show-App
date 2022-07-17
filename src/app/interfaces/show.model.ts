import { IShow } from './show.interface';

export class Show {
	public id: number;
	public title: string;
	public description: string;
	public averageRating: number | null;
	public imageUrl: string | null;
	public reviews:
		| Array<{
				comment: string;
				rating: number;
		  }>
		| [];

	constructor(show: IShow) {
		this.id = show.id;
		this.title = show.title;
		this.description = show.description;
		this.averageRating = show.average_rating;
		this.imageUrl = show.image_url;
		this.reviews = show.reviews;
	}
}
