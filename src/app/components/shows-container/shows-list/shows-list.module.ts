import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsListComponent } from './shows-list.component';
import { ShowCardModule } from './show-card/show-card.module';

@NgModule({
	declarations: [ShowsListComponent],
	imports: [CommonModule, ShowCardModule],
	exports: [ShowsListComponent],
})
export class ShowsListModule {}
