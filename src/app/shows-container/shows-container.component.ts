import { Component } from '@angular/core';
import { IShow } from '../services/show/show.interface';

import { Show } from '../services/show/show.model';

@Component({
	selector: 'app-shows-container',
	templateUrl: './shows-container.component.html',
	styleUrls: ['./shows-container.component.scss'],
})
export class ShowsContainerComponent {
	constructor() {}

	public shows: Array<Show> = [
		{
			title: 'The Lord of the Rings: The Fellowship of the Ring',
			description:
				'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
			average_rating: 8,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_FMjpg_UY474_.jpg%20319w',
		},
		{
			title: 'The Lord of the Rings: The Two Towers',
			description:
				"While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
			average_rating: 9.1,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UY497_.jpg',
		},
		{
			title: 'The Lord of the Rings: The Return of the King',
			description:
				"Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
			average_rating: 9.9,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UY474_.jpg',
		},
		{
			title: 'The Hobbit: An Unexpected Journey',
			description:
				'A reluctant Hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home, and the gold within it from the dragon Smaug.',
			average_rating: 0,
			image_url: '',
		},
	].map((show: IShow) => {
		return new Show(show);
	});

	addNewShow(newShow: Show) {
		this.shows.push(new Show(newShow));
	}
}
