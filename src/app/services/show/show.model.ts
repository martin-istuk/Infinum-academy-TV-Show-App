import { IShow } from './show.interface';

export class Show {
	public title: string;
	public description: string;
	public averageRating: number | null;
	public imageUrl: string | null;

	constructor(show: IShow) {
		this.title = show.title;
		this.description = show.description;
		this.averageRating = show.average_rating;
		this.imageUrl = show.image_url;
	}
}
