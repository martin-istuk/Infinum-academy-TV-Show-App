import { Component, OnInit } from "@angular/core";

import { tap, catchError, EMPTY, BehaviorSubject, switchMap, Observable } from "rxjs";

import { ShowService } from "src/app/services/show/show.service";
import { Show } from "src/app/interfaces/show.model";

@Component({
	selector: "app-top-rated-shows",
	templateUrl: "./top-rated-shows.component.html",
	styleUrls: ["./top-rated-shows.component.scss"]
})
export class TopRatedShowsComponent implements OnInit {
	constructor(private showService: ShowService) {}

	public loadingInProgress: boolean = true;
	public errorOnGetShows: boolean = false;

	// private trigger$ = new BehaviorSubject(undefined);

	public topRatedShows$: Observable<Array<Show>> | null = null;

	ngOnInit(): void {
		this.topRatedShows$ = this.showService.topRatedShows$;
	}

	// public shows$ = this.trigger$.asObservable().pipe(
	// 	tap(() => {
	// 		this.loadingInProgress = true;
	// 		this.errorOnGetShows = false;
	// 	}),
	// 	switchMap(() => {
	// 		return this.showService.getTopRatedShows().pipe(
	// 			tap(() => {
	// 				this.loadingInProgress = false;
	// 				this.errorOnGetShows = false;
	// 			}),
	// 			catchError(() => {
	// 				this.loadingInProgress = false;
	// 				this.errorOnGetShows = true;
	// 				return EMPTY;
	// 			}),
	// 		);
	// 	}),
	// );

	public onRetryClick() {
		this.topRatedShows$ = this.showService.topRatedShows$;
	}
}
