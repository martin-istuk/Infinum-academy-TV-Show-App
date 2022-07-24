import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ReviewsComponent } from './reviews.component';
import { RatingModule } from 'src/app/components/shows-list/show-card/rating/rating.module';

@NgModule({
	declarations: [ReviewsComponent],
	imports: [
		CommonModule,
		MatCardModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		RatingModule,
		ReactiveFormsModule,
	],
	exports: [ReviewsComponent],
})
export class ReviewsModule {}
