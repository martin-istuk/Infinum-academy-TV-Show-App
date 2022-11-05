import { Component } from "@angular/core";

import { tap, catchError, EMPTY, BehaviorSubject, switchMap, Observable } from "rxjs";

import { ShowService } from "src/app/services/show/show.service";
import { Show } from "src/app/interfaces/show.model";

@Component({
	selector: "app-top-rated-shows",
	templateUrl: "./top-rated-shows.component.html",
	styleUrls: ["./top-rated-shows.component.scss"]
})
export class TopRatedShowsComponent {
	constructor(private showService: ShowService) {}

	public loadingInProgress: boolean = true;
	public errorOnGetShows: boolean = false;

	private trigger$ = new BehaviorSubject(undefined);

	public topRatedShows$: Observable<Array<Show>> = this.trigger$.asObservable().pipe(
		tap(() => {
			this.loadingInProgress = true;
			this.errorOnGetShows = false;
		}),
		switchMap(() => {
			return this.showService.getTopRatedShows().pipe(
				tap(() => {
					this.loadingInProgress = false;
					this.errorOnGetShows = false;
				}),
				catchError((error: Error) => {
					window.alert(error);
					this.loadingInProgress = false;
					this.errorOnGetShows = true;
					return EMPTY;
				})
			);
		})
	);

	public onRetryClick() {
		this.topRatedShows$ = this.showService.shows$;
		this.trigger$.next(undefined);
	}
}
