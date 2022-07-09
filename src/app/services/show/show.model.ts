import { IShow } from './show.interface';

export class Show {
	public title: string;
	public description: string;
	public average_rating: number | null;
	public image_url: string | null;

	constructor(show: IShow) {
		this.title = show.title;
		this.description = show.description;
		this.average_rating = show.average_rating;
		this.image_url = show.image_url;
	}
}
