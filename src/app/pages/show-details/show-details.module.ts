import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDetailsComponent } from './show-details.component';
import { ShowCardModule } from 'src/app/components/shows-container/shows-list/show-card/show-card.module';

@NgModule({
	declarations: [ShowDetailsComponent],
	imports: [CommonModule, ShowCardModule],
	exports: [ShowDetailsComponent],
})
export class ShowDetailsModule {}
