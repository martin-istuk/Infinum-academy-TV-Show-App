import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { AddReviewComponent } from './add-review.component';

@NgModule({
	declarations: [AddReviewComponent],
	imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatIconModule],
	exports: [AddReviewComponent],
})
export class AddReviewModule {}
