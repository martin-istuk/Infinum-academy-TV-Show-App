import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Show } from 'src/app/services/show/show.model';

@Component({
	selector: 'app-show-form',
	templateUrl: './show-form.component.html',
	styleUrls: ['./show-form.component.scss'],
})
export class ShowFormComponent {
	constructor() {}

	@Output() addShow = new EventEmitter<Show>();

	titleFormControl = new FormControl('', [Validators.required]);
	descriptionFormControl = new FormControl('', [Validators.required]);

	onAddShow(title: string, description: string) {
		if (title && description) {
			this.addShow.emit(
				new Show({
					title: title,
					description: description,
					average_rating: null,
					image_url: null,
				}),
			);
		}
	}
}
