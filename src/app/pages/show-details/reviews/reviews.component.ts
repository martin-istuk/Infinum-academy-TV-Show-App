import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { EMPTY, map, Subscription, switchMap } from 'rxjs';

import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-reviews',
	templateUrl: './reviews.component.html',
	styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
	constructor(private showService: ShowService, private route: ActivatedRoute) {}

	public ratingOptions: Array<number> = [1, 2, 3, 4, 5];
	private subscription?: Subscription;
	public loadingInProgress: boolean = false;

	private routeId$ = this.route.paramMap.pipe(
		map((params: ParamMap) => {
			return params.get('id');
		}),
	);

	public reviews$ = this.routeId$.pipe(
		switchMap((id: string | null) => {
			if (!id) {
				return EMPTY;
			}
			return this.showService.getShowById(id);
		}),
		map((show) => {
			return show?.reviews;
		}),
	);

	public addReviewForm = new FormGroup({
		comment: new FormControl('', [Validators.required]),
		rating: new FormControl('', [Validators.required]),
	});

	public onPost(event: Event): void {
		event.preventDefault();

		// this.loadingInProgress = true;

		console.log('-----');
		console.log('Comment: ' + this.addReviewForm.controls.comment.value);
		console.log('Rating: ' + this.addReviewForm.controls.rating.value);
		console.log('-----');
	}
}
