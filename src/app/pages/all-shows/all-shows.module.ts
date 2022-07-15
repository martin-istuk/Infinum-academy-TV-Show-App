import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllShowsComponent } from './all-shows.component';
import { ShowsListModule } from 'src/app/components/shows-list/shows-list.module';
import { ShowFormModule } from './show-form/show-form.module';

@NgModule({
	declarations: [AllShowsComponent],
	imports: [CommonModule, ShowsListModule, ShowFormModule],
	exports: [AllShowsComponent],
})
export class AllShowsModule {}
