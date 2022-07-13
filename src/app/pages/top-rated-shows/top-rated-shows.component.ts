import { Component } from '@angular/core';
import { Show } from 'src/app/interfaces/show.model';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-top-rated-shows',
	templateUrl: './top-rated-shows.component.html',
	styleUrls: ['./top-rated-shows.component.scss'],
})
export class TopRatedShowsComponent {
	constructor(private showService: ShowService) {}

	topShows: Array<Show> = this.showService.getTopRatedShows();

	showDetails(showId: number) {
		this.showService.getDetails(showId);
	}
}
