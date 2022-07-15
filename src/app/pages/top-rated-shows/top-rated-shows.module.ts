import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopRatedShowsComponent } from './top-rated-shows.component';
import { ShowCardModule } from 'src/app/components/shows-list/show-card/show-card.module';
import { ShowsListModule } from 'src/app/components/shows-list/shows-list.module';

@NgModule({
	declarations: [TopRatedShowsComponent],
	imports: [CommonModule, ShowsListModule, ShowCardModule],
	exports: [TopRatedShowsComponent],
})
export class TopRatedShowsModule {}
