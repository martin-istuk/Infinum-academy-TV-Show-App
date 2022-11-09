import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { EMPTY, map, BehaviorSubject, switchMap, Observable, Subscription } from "rxjs";

import { ShowService } from "src/app/services/show/show.service";
import { Show } from "src/app/interfaces/show.model";
import { Review } from "src/app/interfaces/review.model";
import { AuthService } from "src/app/services/auth/auth.service";
import { AppUser } from "src/app/interfaces/appUser.model";

@Component({
	selector: "app-show-details",
	templateUrl: "./show-details.component.html",
	styleUrls: ["./show-details.component.scss"]
})
export class ShowDetailsComponent implements OnDestroy {
	private routeId$: Observable<string | null>;
	public show$: Observable<Show>;
	private addReviewSubs?: Subscription;
	private deleteReviewSubs?: Subscription;

	constructor(private showService: ShowService, private authService: AuthService, private route: ActivatedRoute) {
		this.routeId$ = this.route.paramMap.pipe(
			map((params: ParamMap) => {
				const id: string = params.get("id") as string;
				return id;
			})
		);
		this.show$ = this.routeId$.pipe(
			switchMap((id: string | null) => {
				if (!id) {
					return EMPTY;
				} else {
					return this.showService.getShowById(id);
				}
			})
		);
	}

	public addReview(reviewData: any): void {
		this.addReviewSubs = this.authService.user$
			.pipe(
				switchMap((user) => {
					return !user ? EMPTY : this.showService.addReview(user.email, reviewData.showTitle, reviewData);
				})
			)
			.subscribe({
				next: () => window.location.reload(),
				error: (error) => window.alert(error)
			});
	}

	public requestDeleteReview(review: Review): void {
		this.deleteReviewSubs = this.routeId$
			.pipe(
				switchMap((showId: string | null) => {
					return !showId ? EMPTY : this.showService.deleteReview(showId, review);
				})
			)
			.subscribe({
				next: () => window.location.reload(),
				error: (error) => window.alert(error)
			});
	}

	ngOnDestroy(): void {
		this.deleteReviewSubs?.unsubscribe();
		this.addReviewSubs?.unsubscribe();
	}
}
