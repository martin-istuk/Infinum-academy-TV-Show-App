import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Show } from 'src/app/interfaces/show.model';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-all-shows',
	templateUrl: './all-shows.component.html',
	styleUrls: ['./all-shows.component.scss'],
})
export class AllShowsComponent implements OnDestroy {
	constructor(private showService: ShowService) {}

	public allShows: Array<Show> = [];

	private subscription: Subscription = this.showService.getAllShows().subscribe({
		next: (shows) => {
			this.allShows = shows;
		},
	});

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
