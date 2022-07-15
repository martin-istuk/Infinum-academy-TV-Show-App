import { Component, Input } from '@angular/core';
import { Show } from 'src/app/interfaces/show.model';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-show-card',
	templateUrl: './show-card.component.html',
	styleUrls: ['./show-card.component.scss'],
})
export class ShowCardComponent {
	constructor(private showService: ShowService) {}

	@Input() showData: Show = {
		id: 0,
		title: '',
		description: '',
		averageRating: null,
		imageUrl: null,
	};

	@Input() showId: number = 0;

	public randomNumber = this.showService.randomNumber;
}
