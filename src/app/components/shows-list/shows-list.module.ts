import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsListComponent } from './shows-list.component';
import { ShowCardModule } from './show-card/show-card.module';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [ShowsListComponent],
	imports: [CommonModule, RouterModule, ShowCardModule],
	exports: [ShowsListComponent],
})
export class ShowsListModule {}
