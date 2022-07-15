import { Component } from '@angular/core';
import { Show } from 'src/app/interfaces/show.model';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-all-shows',
	templateUrl: './all-shows.component.html',
	styleUrls: ['./all-shows.component.scss'],
})
export class AllShowsComponent {
	constructor(private showService: ShowService) {}

	allShows: Array<Show> = this.showService.getAllShows();
}
