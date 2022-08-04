import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomTitleCasePipe } from './custom-title-case.pipe';

@NgModule({
	declarations: [CustomTitleCasePipe],
	imports: [CommonModule],
	exports: [CustomTitleCasePipe],
})
export class CustomTitleCaseModule {}
