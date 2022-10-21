import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { ShowCardDetailsModule } from "./show-card-details/show-card-details.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { AddReviewModule } from "./add-review/add-review.module";
import { ShowDetailsComponent } from "./show-details.component";

@NgModule({
	declarations: [ShowDetailsComponent],
	imports: [CommonModule, ShowCardDetailsModule, ReviewsModule, MatProgressSpinnerModule, AddReviewModule],
	exports: [ShowDetailsComponent]
})
export class ShowDetailsModule {}
