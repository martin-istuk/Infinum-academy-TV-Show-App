import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCardDetailsComponent } from './show-card-details.component';
import { MatCardModule } from '@angular/material/card';
import { RatingModule } from 'src/app/components/shows-list/show-card/rating/rating.module';

@NgModule({
	declarations: [ShowCardDetailsComponent],
	imports: [CommonModule, MatCardModule, RatingModule],
	exports: [ShowCardDetailsComponent],
})
export class ShowCardDetailsModule {}
