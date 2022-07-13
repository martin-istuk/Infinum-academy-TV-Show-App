import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllShowsComponent } from './all-shows.component';
import { ShowsContainerModule } from 'src/app/components/shows-container/shows-container.module';

@NgModule({
	declarations: [AllShowsComponent],
	imports: [CommonModule, ShowsContainerModule],
	exports: [AllShowsComponent],
})
export class AllShowsModule {}
