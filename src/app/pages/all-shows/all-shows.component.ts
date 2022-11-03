import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { ShowService } from "src/app/services/show/show.service";
import { Show } from "src/app/interfaces/show.model";

@Component({
	selector: "app-all-shows",
	templateUrl: "./all-shows.component.html",
	styleUrls: ["./all-shows.component.scss"]
})
export class AllShowsComponent implements OnInit {
	constructor(private showService: ShowService) {}

	public loadingInProgress: boolean = true;
	public errorOnGetShows: boolean = false;

	// private trigger$ = new BehaviorSubject(undefined);

	public shows$?: Observable<Array<Show>>;

	ngOnInit(): void {
		this.shows$ = this.showService.getAllShows();
	}

	// public shows$ = this.trigger$.asObservable().pipe(
	// 	tap(() => {
	// 		this.loadingInProgress = true;
	// 		this.errorOnGetShows = false;
	// 	}),
	// 	switchMap(() => {
	// 		return this.showService.getAllShows().pipe(
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
		this.shows$ = this.showService.shows$;
		// this.trigger$.next(undefined);
	}
}
