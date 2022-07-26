import { Component, Input } from '@angular/core';

import { Review } from 'src/app/interfaces/review.model';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
	selector: 'app-reviews',
	templateUrl: './reviews.component.html',
	styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
	constructor(public reviewService: ReviewService) {}

	@Input() showId?: string;

	@Input() reviewsData: Array<Review> = [];
}
