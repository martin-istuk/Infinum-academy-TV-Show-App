import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { EMPTY, map, BehaviorSubject, switchMap, Observable, Subscription } from "rxjs";

import { ShowService } from "src/app/services/show/show.service";
import { Show } from "src/app/interfaces/show.model";
import { Review } from "src/app/interfaces/review.model";

@Component({
	selector: "app-show-details",
	templateUrl: "./show-details.component.html",
	styleUrls: ["./show-details.component.scss"]
})
export class ShowDetailsComponent implements OnDestroy {
	private routeId$: Observable<string | null>;
	public show$: Observable<Show>;
	private subscription?: Subscription;

	constructor(private showService: ShowService, private route: ActivatedRoute) {
		this.routeId$ = this.route.paramMap.pipe(
			map((params: ParamMap) => {
				const id: string = params.get("id") as string;
				return id;
			})
		);
		this.show$ = this.routeId$.pipe(
			switchMap((id: string | null) => {
				return !id ? EMPTY : this.showService.getShowById(id);
			})
		);
	}

	public addReview(reviewData: any): void {}

	public requestDeleteReview(review: Review): void {
		this.subscription = this.routeId$
			.pipe(
				switchMap((showId: string | null) => {
					return !showId ? EMPTY : this.showService.deleteReview(showId, review);
				})
			)
			.subscribe({
				next: () => console.log("EEEEEE")
			});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
