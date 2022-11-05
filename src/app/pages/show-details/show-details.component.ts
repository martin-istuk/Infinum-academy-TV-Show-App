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
	private trigger$ = new BehaviorSubject<string | null>(null);
	private routeId$: Observable<string | null>;
	public show$: Observable<Show>;

	constructor(private showService: ShowService, private route: ActivatedRoute) {
		this.routeId$ = this.route.paramMap.pipe(
			map((params: ParamMap) => {
				return params.get("id") as string;
			}),
			tap((id: string) => this.trigger$.next(id))
		);
		this.show$ = this.routeId$.pipe(
			switchMap((id: string | null) => {
				return !id ? EMPTY : this.showService.getShowById(id);
			})
		);
	}

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
