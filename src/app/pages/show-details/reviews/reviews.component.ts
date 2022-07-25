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
	public rating: number = 0;

	public starsArray: Array<string> = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];

	public addReviewForm = new FormGroup({
		commentInput: new FormControl('', [Validators.required]),
		ratingInput: new FormControl('', [Validators.required]),
	});

	setRating(rating: number): void {
		this.addReviewForm.controls.ratingInput.setValue(String(rating));
		this.rating = rating;
		switch (rating) {
			case 1:
				this.starsArray = ['star', 'star_border', 'star_border', 'star_border', 'star_border'];
				break;
			case 2:
				this.starsArray = ['star', 'star', 'star_border', 'star_border', 'star_border'];
				break;
			case 3:
				this.starsArray = ['star', 'star', 'star', 'star_border', 'star_border'];
				break;
			case 4:
				this.starsArray = ['star', 'star', 'star', 'star', 'star_border'];
				break;
			default:
				this.starsArray = ['star', 'star', 'star', 'star', 'star'];
		}
	}

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

	public onPostNewReview(event: Event): void {
		event.preventDefault();
		// this.loadingInProgress = true;

		this.subscription = this.route.params.subscribe((params: Params) => {
			this.showId = params['id'];
		});

		if (this.addReviewForm.controls.commentInput.value) {
			this.comment = this.addReviewForm.controls.commentInput.value;
		}

		if (this.addReviewForm.controls.ratingInput.value) {
			this.rating = Number(this.addReviewForm.controls.ratingInput.value);
		}

		this.reviewService.addNewReview(this.showId, this.comment, this.rating);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
