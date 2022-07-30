import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IReview } from 'src/app/interfaces/review.interface';
import { Review } from 'src/app/interfaces/review.model';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
	selector: 'app-add-review',
	templateUrl: './add-review.component.html',
	styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent {
	constructor(private reviewService: ReviewService, private route: ActivatedRoute) {}

	public ratingOptions: Array<number> = [1, 2, 3, 4, 5];
	@Input() showId: string = '';
	private comment: string = '';
	private rating: number = 0;
	@Output() postReviewEmitter = new EventEmitter<any>();

	public addReviewForm = new FormGroup({
		comment: new FormControl('', [Validators.required]),
		rating: new FormControl('', [Validators.required]),
	});

	public onPostReview(event: Event): void {
		event.preventDefault();

		if (this.addReviewForm.controls.comment.value) {
			this.comment = this.addReviewForm.controls.comment.value;
		}

		if (this.addReviewForm.controls.rating.value) {
			this.rating = Number(this.addReviewForm.controls.rating.value);
		}

		const reviewData = {
			rating: this.rating,
			comment: this.comment,
			show_id: this.showId,
		};

		this.postReviewEmitter.emit(reviewData);

		this.addReviewForm.reset();
	}
}
