import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { EMPTY, map, tap, BehaviorSubject, switchMap, Observable } from "rxjs";

import { ShowService } from "src/app/services/show/show.service";
import { Show } from "src/app/interfaces/show.model";
import { Review } from "src/app/interfaces/review.model";

@Component({
	selector: "app-show-details",
	templateUrl: "./show-details.component.html",
	styleUrls: ["./show-details.component.scss"]
})
export class ShowDetailsComponent {
	constructor(private showService: ShowService, private route: ActivatedRoute) {}

	public trigger$ = new BehaviorSubject<string | null>(null);

	private routeId$: Observable<string | null> = this.route.paramMap.pipe(
		map((params: ParamMap) => {
			return params.get("id");
		}),
		tap((id) => this.trigger$.next(id))
	);

	public show$: Observable<Show> = this.routeId$.pipe(
		switchMap((id: string | null) => {
			if (!id) {
				return EMPTY;
			}
			return this.showService.shows$.pipe(
				map((allShows: Array<Show>) => {
					return allShows.filter((show: Show) => {
						show.urlTitle === id;
					})[0];
				})
			);
		})
	);

	public reviews$ = this.trigger$.pipe(
		switchMap((id: string | null) => {
			// if (!id) {
			// 	return EMPTY;
			// }
			// return this.reviewService.getReviewsByShowId(id);
			return EMPTY;
		})
	);

	public addReview(reviewData: any): void {
		// this.reviewService.addNewReview(reviewData).subscribe({
		// 	next: () => this.trigger$.next(reviewData.show_id)
		// });
	}

	public requestDeleteReview(review: Review): void {
		// this.reviewService.deleteReview(review).subscribe({
		// 	next: () => this.trigger$.next(review.showId),
		// });
	}
}
