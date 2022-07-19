import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { Review } from 'src/app/interfaces/review.model';
import { Show } from 'src/app/interfaces/show.model';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-show-details',
	templateUrl: './show-details.component.html',
	styleUrls: ['./show-details.component.scss'],
})
export class ShowDetailsComponent implements OnInit, OnDestroy {
	constructor(private showService: ShowService, private route: ActivatedRoute) {}

	private subscription?: Subscription;
	public show$?: Observable<Show | undefined>;
	public reviews$?: Observable<Array<Review> | undefined>;

	ngOnInit(): void {
		this.subscription = this.route.paramMap.subscribe({
			next: (params: ParamMap) => {
				const id = Number(params.get('id'));

				this.show$ = this.showService.getAllShows().pipe(
					map((shows: Array<Show>) => {
						return shows[id];
					}),
				);

				this.reviews$ = this.showService.getAllShows().pipe(
					map((shows: Array<Show>) => {
						return shows[id].reviews;
					}),
				);
			},
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
