import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-rating',
	templateUrl: './rating.component.html',
	styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
	constructor() {}

	@Input() avgRating: number | null = 0;

	public get goldStars() {
		return Math.round(Number(this.avgRating));
	}

	public get greyStars() {
		return 10 - Math.round(Number(this.avgRating));
	}
}
