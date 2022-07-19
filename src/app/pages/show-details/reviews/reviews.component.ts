import { Component, Input } from '@angular/core';
import { Review } from 'src/app/interfaces/review.model';

@Component({
	selector: 'app-reviews',
	templateUrl: './reviews.component.html',
	styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
	@Input() reviewsData?: Array<Review> | null;
}
