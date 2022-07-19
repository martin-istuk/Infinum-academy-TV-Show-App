import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription, map } from 'rxjs';

import { Show } from 'src/app/interfaces/show.model';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-all-shows',
	templateUrl: './all-shows.component.html',
	styleUrls: ['./all-shows.component.scss'],
})
export class AllShowsComponent implements OnInit, OnDestroy {
	constructor(private showService: ShowService) {}

	private subscription?: Subscription;
	public allShows$?: Observable<Array<Show> | undefined>;
	public loadingInProgress: boolean = true;
	public errorOnGetShows: boolean = false;

	ngOnInit(): void {
		this.subscription = this.showService.getAllShows().subscribe({
			next: (shows: Array<Show>) => {
				this.allShows$ = this.showService.getAllShows();
				this.loadingInProgress = false;
			},
			error: (error: Error) => {
				this.loadingInProgress = false;
				this.errorOnGetShows = true;
				console.error(error);
			},
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
