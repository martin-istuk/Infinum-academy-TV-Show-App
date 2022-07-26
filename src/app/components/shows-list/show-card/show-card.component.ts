import { Component, Input } from '@angular/core';

import { Show } from 'src/app/interfaces/show.model';

@Component({
	selector: 'app-show-card',
	templateUrl: './show-card.component.html',
	styleUrls: ['./show-card.component.scss'],
})
export class ShowCardComponent {
	@Input() showData?: Show;
}
