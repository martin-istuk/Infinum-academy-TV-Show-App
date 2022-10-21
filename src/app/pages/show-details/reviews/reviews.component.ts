import { Component, EventEmitter, Input, Output } from "@angular/core";

import { AuthService } from "src/app/services/auth/auth.service";
import { Review } from "src/app/interfaces/review.model";

@Component({
	selector: "app-reviews",
	templateUrl: "./reviews.component.html",
	styleUrls: ["./reviews.component.scss"]
})
export class ReviewsComponent {
	constructor(private authService: AuthService) {}

	@Input() showId?: string;

	@Input() reviewsData: Array<Review> = [];

	public user$ = this.authService.user$;

	@Output() deleteReviewEmitter = new EventEmitter<any>();

	public onDeleteReview(event: Event, review: Review): void {
		event.preventDefault();
		this.deleteReviewEmitter.emit(review);
	}
}
