import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Show } from 'src/app/interfaces/show.model';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-top-rated-shows',
	templateUrl: './top-rated-shows.component.html',
	styleUrls: ['./top-rated-shows.component.scss'],
})
export class TopRatedShowsComponent implements OnInit, OnDestroy {
	constructor(private showService: ShowService) {}

	private subscription?: Subscription;
	public topShows$?: Observable<Array<Show> | undefined>;
	public loadingInProgress: boolean = true;
	public errorOnGetShows: boolean = false;

	ngOnInit(): void {
		this.subscription = this.showService.getTopRatedShows().subscribe({
			next: (shows: Array<Show>) => {
				this.topShows$ = this.showService.getTopRatedShows();
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
