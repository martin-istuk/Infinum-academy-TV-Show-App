import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { Review } from 'src/app/interfaces/review.model';
import { Show } from 'src/app/interfaces/show.model';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
	selector: 'app-show-card',
	templateUrl: './show-card.component.html',
	styleUrls: ['./show-card.component.scss'],
})
export class ShowCardComponent {
	constructor(private reviewService: ReviewService) {}

	@Input() showData?: Show;
	@Input() showId: string = '';

	public reviews$: Observable<Array<Review>> = this.reviewService.getReviewsByShowId(this.showId);
}
