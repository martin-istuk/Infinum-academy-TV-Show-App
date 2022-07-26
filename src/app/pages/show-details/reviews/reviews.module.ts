import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './reviews.component';
import { MatCardModule } from '@angular/material/card';
import { RatingModule } from 'src/app/components/shows-list/show-card/rating/rating.module';

@NgModule({
	declarations: [ReviewsComponent],
	imports: [CommonModule, MatCardModule, RatingModule],
	exports: [ReviewsComponent],
})
export class ReviewsModule {}
