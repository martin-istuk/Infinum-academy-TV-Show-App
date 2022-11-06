import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "src/app/services/auth/auth.service";

@Component({
	selector: "app-add-review",
	templateUrl: "./add-review.component.html",
	styleUrls: ["./add-review.component.scss"]
})
export class AddReviewComponent {
	@Input() showTitle?: string;
	@Output() addReviewEmitter = new EventEmitter<any>();
	public addReviewForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private authService: AuthService) {
		this.addReviewForm = this.formBuilder.group({
			comment: ["", [Validators.required]],
			rating: ["", [Validators.required]]
		});
	}

	public onPostReview(event: Event): void {
		event.preventDefault();

		this.addReviewEmitter.emit({
			showTitle: this.showTitle,
			comment: this.addReviewForm.controls["comment"].value,
			rating: this.addReviewForm.controls["rating"].value
		});

		this.addReviewForm.reset();
	}
}
