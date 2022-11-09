import { Component, EventEmitter, Input, Output } from "@angular/core";

import { Observable } from "rxjs";

import { AuthService } from "src/app/services/auth/auth.service";
import { AppUser } from "src/app/interfaces/appUser.model";
import { Review } from "src/app/interfaces/review.model";

@Component({
	selector: "app-reviews",
	templateUrl: "./reviews.component.html",
	styleUrls: ["./reviews.component.scss"]
})
export class ReviewsComponent {
	@Input() showId?: string;
	@Input() reviewsData: Array<Review> = [];
	@Output() deleteReviewEmitter = new EventEmitter<any>();
	public user$: Observable<AppUser | null>;

	constructor(private authService: AuthService) {
		this.user$ = this.authService.user$;
	}

	public onDeleteReview(event: Event, review: Review): void {
		event.preventDefault();
		this.deleteReviewEmitter.emit(review);
	}
}
