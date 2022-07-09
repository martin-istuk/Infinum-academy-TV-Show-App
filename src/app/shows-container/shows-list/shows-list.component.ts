import { Component, Input } from '@angular/core';

import { IShow } from 'src/app/services/show/show.interface';

@Component({
	selector: 'app-shows-list',
	templateUrl: './shows-list.component.html',
	styleUrls: ['./shows-list.component.scss'],
})
export class ShowsListComponent {
	constructor() {}

	@Input() showsData: Array<IShow> = [];
}
