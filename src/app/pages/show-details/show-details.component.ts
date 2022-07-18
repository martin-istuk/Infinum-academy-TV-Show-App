import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/interfaces/review.model';
import { Show } from 'src/app/interfaces/show.model';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-show-details',
	templateUrl: './show-details.component.html',
	styleUrls: ['./show-details.component.scss'],
})
export class ShowDetailsComponent implements OnDestroy {
	constructor(private showService: ShowService, private route: ActivatedRoute) {}

	public showData?: Show;
	public reviewsData?: Array<Review>;

	private subscription: Subscription = this.showService.getAllShows().subscribe({
		next: (shows) => {
			const id = this.route.snapshot.params['id'];
			this.showData = shows[id];
			this.reviewsData = shows[id].reviews;
		},
	});

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
