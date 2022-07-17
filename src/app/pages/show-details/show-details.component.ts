import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Show } from 'src/app/interfaces/show.model';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-show-details',
	templateUrl: './show-details.component.html',
	styleUrls: ['./show-details.component.scss'],
})
export class ShowDetailsComponent implements OnDestroy {
	constructor(private showService: ShowService, private route: ActivatedRoute) {}

	public show: Show = {
		id: 0,
		title: '',
		description: '',
		averageRating: 0,
		imageUrl: '',
		reviews: [],
	};

	private subscription: Subscription = this.showService.getAllShows().subscribe({
		next: (shows) => {
			const id = this.route.snapshot.params['id'];
			this.show = shows[id - 1];
		},
	});

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
