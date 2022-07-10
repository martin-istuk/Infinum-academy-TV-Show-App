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
	// goldArray: Array<number> = new Array(
	// 	Math.round( Number(0 + this.avgRating) )
	// );

	greyArray: Array<number> = new Array(2);
	// greyArray: Array<number> = new Array(
	// 	Math.round( Number(10 - this.avgRating) )
	// );
}
