import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowCardComponent } from './show-card.component';
import { MatCardModule } from '@angular/material/card';
import { RatingModule } from './rating/rating.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	declarations: [ShowCardComponent],
	imports: [CommonModule, MatCardModule, RatingModule, MatIconModule],
	exports: [ShowCardComponent],
})
export class ShowCardModule {}
