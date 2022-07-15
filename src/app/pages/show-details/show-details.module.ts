import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDetailsComponent } from './show-details.component';
import { ShowCardDetailsModule } from './show-card-details/show-card-details.module';

@NgModule({
	declarations: [ShowDetailsComponent],
	imports: [CommonModule, ShowCardDetailsModule],
	exports: [ShowDetailsComponent],
})
export class ShowDetailsModule {}
