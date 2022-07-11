import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsContainerComponent } from './shows-container.component';
import { ShowsListModule } from './shows-list/shows-list.module';
import { ShowFormModule } from './show-form/show-form.module';

@NgModule({
	declarations: [ShowsContainerComponent],
	imports: [CommonModule, ShowsListModule, ShowFormModule],
	exports: [ShowsContainerComponent],
})
export class ShowsContainerModule {}
