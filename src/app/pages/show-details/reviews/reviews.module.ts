import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './reviews.component';
import { MatCardModule } from '@angular/material/card';
import { RatingModule } from 'src/app/components/shows-list/show-card/rating/rating.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [ReviewsComponent],
	imports: [CommonModule, MatCardModule, RatingModule, MatButtonModule, MatIconModule],
	exports: [ReviewsComponent],
})
export class ReviewsModule {}
