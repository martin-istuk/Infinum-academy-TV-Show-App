import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { Observable } from "rxjs";

import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/app/interfaces/user.model";
import { Review } from "src/app/interfaces/review.model";

@Component({
	selector: "app-reviews",
	templateUrl: "./reviews.component.html",
	styleUrls: ["./reviews.component.scss"]
})
export class ReviewsComponent implements OnInit {
	constructor(private authService: AuthService) {}

	@Input() showId?: string;

	@Input() reviewsData: Array<Review> = [];

	public user$?: Observable<User | null>;

	ngOnInit(): void {
		this.user$ = this.authService.user$;
	}

	@Output() deleteReviewEmitter = new EventEmitter<any>();

	public onDeleteReview(event: Event, review: Review): void {
		event.preventDefault();
		this.deleteReviewEmitter.emit(review);
	}
}
