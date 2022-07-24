import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

import { EMPTY, map, Subscription, switchMap } from 'rxjs';

import { ReviewService } from 'src/app/services/review/review.service';

@Component({
	selector: 'app-reviews',
	templateUrl: './reviews.component.html',
	styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnDestroy {
	constructor(private reviewService: ReviewService, private route: ActivatedRoute) {}

	private subscription?: Subscription;
	public ratingOptions: Array<number> = [1, 2, 3, 4, 5];
	public loadingInProgress: boolean = false;

	private showId: string = '';
	private comment: string = '';
	private rating: number = 0;

	private routeId$ = this.route.paramMap.pipe(
		map((params: ParamMap) => {
			return params.get('id');
		}),
	);

	public reviews$ = this.routeId$.pipe(
		switchMap((id: string | null) => {
			if (!id) {
				return EMPTY;
			}
			return this.reviewService.getReviewsByShowId(id);
		}),
	);

	public addReviewForm = new FormGroup({
		comment: new FormControl('', [Validators.required]),
		rating: new FormControl('', [Validators.required]),
	});

	public onPostReview(event: Event): void {
		event.preventDefault();
		// this.loadingInProgress = true;

		this.subscription = this.route.params.subscribe((params: Params) => {
			this.showId = params['id'];
		});

		if (this.addReviewForm.controls.comment.value) {
			this.comment = this.addReviewForm.controls.comment.value;
		}

		if (this.addReviewForm.controls.rating.value) {
			this.rating = Number(this.addReviewForm.controls.rating.value);
		}

		this.reviewService.addNewReview(this.showId, this.comment, this.rating);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
