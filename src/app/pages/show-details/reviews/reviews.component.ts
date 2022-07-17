import { Component, Input } from '@angular/core';
import { Show } from 'src/app/interfaces/show.model';

@Component({
	selector: 'app-reviews',
	templateUrl: './reviews.component.html',
	styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
	@Input() showData: Show = {
		id: 0,
		title: '',
		description: '',
		averageRating: null,
		imageUrl: null,
		reviews: [],
	};
}
