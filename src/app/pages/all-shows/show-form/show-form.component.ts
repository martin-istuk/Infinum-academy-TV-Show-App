import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-show-form',
	templateUrl: './show-form.component.html',
	styleUrls: ['./show-form.component.scss'],
})
export class ShowFormComponent {
	constructor(private showService: ShowService) {}

	titleFormControl = new FormControl('', [Validators.required]);
	descriptionFormControl = new FormControl('', [Validators.required]);

	// onAddNewShow(title: string, description: string) {
	// 	this.showService.addNewShow(title, description);
	// }
}
