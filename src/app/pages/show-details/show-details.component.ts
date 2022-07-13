import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Show } from 'src/app/interfaces/show.model';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-show-details',
	templateUrl: './show-details.component.html',
	styleUrls: ['./show-details.component.scss'],
})
export class ShowDetailsComponent implements OnInit {
	constructor(private showService: ShowService, private route: ActivatedRoute) {}

	show: Show = this.showService.getAllShows()[0];

	ngOnInit() {
		const id = this.route.snapshot.params['id'];
		this.show = this.showService.getAllShows()[id - 1];
	}
}
