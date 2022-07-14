import { Component } from '@angular/core';
import { Show } from 'src/app/interfaces/show.model';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-shows-list',
	templateUrl: './shows-list.component.html',
	styleUrls: ['./shows-list.component.scss'],
})
export class ShowsListComponent {
	constructor(private showService: ShowService) {}

	allShows: Array<Show> = this.showService.getAllShows();

	topShows: Array<Show> = this.showService.getTopRatedShows();
}
