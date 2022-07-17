import { Component, Input } from '@angular/core';
import { Show } from 'src/app/interfaces/show.model';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-show-card-details',
	templateUrl: './show-card-details.component.html',
	styleUrls: ['./show-card-details.component.scss'],
})
export class ShowCardDetailsComponent {
	constructor(private showService: ShowService) {}

	@Input() showData: Show = {
		id: 0,
		title: '',
		description: '',
		averageRating: null,
		imageUrl: null,
		reviews: [],
	};

	public randomNumber = this.showService.randomNumber;
}
