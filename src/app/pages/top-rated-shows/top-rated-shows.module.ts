import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopRatedShowsComponent } from './top-rated-shows.component';
import { ShowCardModule } from 'src/app/components/shows-container/shows-list/show-card/show-card.module';

@NgModule({
	declarations: [TopRatedShowsComponent],
	imports: [CommonModule, ShowCardModule],
	exports: [TopRatedShowsComponent],
})
export class TopRatedShowsModule {}
