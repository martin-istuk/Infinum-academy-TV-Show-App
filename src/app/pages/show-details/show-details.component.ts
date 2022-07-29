import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { EMPTY, map, tap, BehaviorSubject, switchMap } from 'rxjs';

import { ShowService } from 'src/app/services/show/show.service';
import { ReviewService } from 'src/app/services/review/review.service';
import { IReview } from 'src/app/interfaces/review.interface';

@Component({
	selector: 'app-show-details',
	templateUrl: './show-details.component.html',
	styleUrls: ['./show-details.component.scss'],
})
export class ShowDetailsComponent {
	constructor(private showService: ShowService, private reviewService: ReviewService, private route: ActivatedRoute) {}

	private routeId$ = this.route.paramMap.pipe(
		map((params: ParamMap) => {
			return params.get('id');
		}),
		tap((id) => this.trigger$.next(id)),
	);

	public show$ = this.routeId$.pipe(
		switchMap((id: string | null) => {
			if (!id) {
				return EMPTY;
			}
			return this.showService.getShowById(id);
		}),
	);

	public trigger$ = new BehaviorSubject<string | undefined | null>(undefined);

	public reviews$ = this.trigger$.pipe(
		switchMap((id: string | undefined | null) => {
			if (!id) {
				return EMPTY;
			}
			return this.reviewService.getReviewsByShowId(id);
		}),
	);

	public addReview(reviewData: IReview): void {
		this.reviewService.addNewReview(reviewData).subscribe({
			next: () => this.trigger$.next(reviewData.show_id),
		});
	}
}
