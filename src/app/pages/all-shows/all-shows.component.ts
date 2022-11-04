import { Component } from "@angular/core";

import { BehaviorSubject, catchError, EMPTY, Observable, switchMap, tap } from "rxjs";

import { ShowService } from "src/app/services/show/show.service";
import { Show } from "src/app/interfaces/show.model";

@Component({
	selector: "app-all-shows",
	templateUrl: "./all-shows.component.html",
	styleUrls: ["./all-shows.component.scss"]
})
export class AllShowsComponent {
	constructor(private showService: ShowService) {}

	public loadingInProgress: boolean = true;
	public errorOnGetShows: boolean = false;

	private trigger$ = new BehaviorSubject(undefined);

	public shows$: Observable<Array<Show>> = this.trigger$.asObservable().pipe(
		tap(() => {
			this.loadingInProgress = true;
			this.errorOnGetShows = false;
		}),
		switchMap(() => {
			return this.showService.getAllShows().pipe(
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
		this.shows$ = this.showService.shows$;
		this.trigger$.next(undefined);
	}
}
