import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-rating',
	templateUrl: './rating.component.html',
	styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
	@Input() avgRating: number | null = 0;
	@Input() reviewRating: number | null = 0;

	public get goldStars() {
		if (this.avgRating) {
			return Math.round(Number(this.avgRating));
		} else {
			return Math.round(Number(this.reviewRating));
		}
	}

	public get greyStars() {
		if (this.avgRating) {
			return 10 - Math.round(Number(this.avgRating));
		} else {
			return 10 - Math.round(Number(this.reviewRating));
		}
	}
}
