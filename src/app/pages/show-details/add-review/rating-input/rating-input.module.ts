import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { RatingInputComponent } from './rating-input.component';

@NgModule({
	declarations: [RatingInputComponent],
	imports: [CommonModule, MatIconModule],
	exports: [RatingInputComponent],
})
export class RatingInputModule {}
