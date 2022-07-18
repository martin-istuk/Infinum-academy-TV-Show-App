import { Component, Input } from '@angular/core';
import { Show } from 'src/app/interfaces/show.model';

@Component({
	selector: 'app-show-card-details',
	templateUrl: './show-card-details.component.html',
	styleUrls: ['./show-card-details.component.scss'],
})
export class ShowCardDetailsComponent {
	@Input() showData?: Show;
}
