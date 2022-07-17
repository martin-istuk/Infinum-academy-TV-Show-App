import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Show } from 'src/app/interfaces/show.model';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-top-rated-shows',
	templateUrl: './top-rated-shows.component.html',
	styleUrls: ['./top-rated-shows.component.scss'],
})
export class TopRatedShowsComponent implements OnDestroy {
	constructor(private showService: ShowService) {}

	public topShows: Array<Show> = [];

	private subscription: Subscription = this.showService.getTopRatedShows().subscribe({
		next: (shows) => {
			this.topShows = shows;
		},
	});

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
