import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllShowsComponent } from './all-shows.component';
import { ShowsListModule } from 'src/app/components/shows-list/shows-list.module';
import { ShowFormModule } from './show-form/show-form.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [AllShowsComponent],
	imports: [CommonModule, ShowsListModule, ShowFormModule, MatProgressSpinnerModule, MatButtonModule],
	exports: [AllShowsComponent],
})
export class AllShowsModule {}
