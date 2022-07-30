export interface IReview {
	id: string;
	show_id: string;
	comment: string;
	rating: number;
	user: {
		id: string;
		email: string;
		image_url: string | null;
	};
}
