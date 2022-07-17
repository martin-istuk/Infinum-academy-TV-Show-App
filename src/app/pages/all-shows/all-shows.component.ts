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
	public loadingInProgress: boolean = !Boolean(this.allShows.length);
	public errorOnGetShows: boolean = false;

	private subscription: Subscription = this.showService.getAllShows().subscribe({
		next: (shows: Array<Show>) => {
			this.loadingInProgress = false;
			this.allShows = shows;
		},
		error: () => {
			this.loadingInProgress = false;
			this.errorOnGetShows = true;
		},
	});

	public getShows(): void {
		this.showService.getAllShows();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
