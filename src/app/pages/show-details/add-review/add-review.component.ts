import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ReviewService } from 'src/app/services/review/review.service';

@Component({
	selector: 'app-add-review',
	templateUrl: './add-review.component.html',
	styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent {
	constructor(private reviewService: ReviewService, private route: ActivatedRoute) {}

	public ratingOptions: Array<number> = [1, 2, 3, 4, 5];
	public loadingInProgress: boolean = false;

	@Input() showId: string = '';
	private comment: string = '';
	private rating: number = 0;

	public addReviewForm = new FormGroup({
		comment: new FormControl('', [Validators.required]),
		rating: new FormControl('', [Validators.required]),
	});

	public onPostReview(event: Event): void {
		event.preventDefault();

		this.loadingInProgress = true;

		if (this.addReviewForm.controls.comment.value) {
			this.comment = this.addReviewForm.controls.comment.value;
		}

		if (this.addReviewForm.controls.rating.value) {
			this.rating = Number(this.addReviewForm.controls.rating.value);
		}

		this.reviewService.addNewReview(this.showId, this.comment, this.rating);

		this.loadingInProgress = false;
	}
}
