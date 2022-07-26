import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDetailsComponent } from './show-details.component';
import { ShowCardDetailsModule } from './show-card-details/show-card-details.module';
import { ReviewsModule } from './reviews/reviews.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddNewReviewModule } from './add-review/add-review.module';

@NgModule({
	declarations: [ShowDetailsComponent],
	imports: [CommonModule, ShowCardDetailsModule, ReviewsModule, MatProgressSpinnerModule, AddNewReviewModule],
	exports: [ShowDetailsComponent],
})
export class ShowDetailsModule {}
