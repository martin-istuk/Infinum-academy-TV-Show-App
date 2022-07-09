import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-rating',
	templateUrl: './rating.component.html',
	styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
	constructor() {}

	@Input() avgRating: number | null = 0;

	goldArray: Array<number> = new Array(8);

	greyArray: Array<number> = new Array(2);
}
