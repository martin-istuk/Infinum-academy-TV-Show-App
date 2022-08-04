import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [UploadComponent],
	imports: [CommonModule, MatButtonModule],
	exports: [UploadComponent],
})
export class UploadModule {}
