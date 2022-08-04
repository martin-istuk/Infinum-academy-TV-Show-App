import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile.component';
import { UploadModule } from './upload/upload.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
	declarations: [MyProfileComponent],
	imports: [CommonModule, UploadModule, MatDialogModule],
	exports: [MyProfileComponent],
})
export class MyProfileModule {}
