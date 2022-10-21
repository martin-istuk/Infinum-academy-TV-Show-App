import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatDialogModule } from "@angular/material/dialog";

import { UploadModule } from "./upload/upload.module";
import { MyProfileComponent } from "./my-profile.component";

@NgModule({
	declarations: [MyProfileComponent],
	imports: [CommonModule, UploadModule, MatDialogModule],
	exports: [MyProfileComponent]
})
export class MyProfileModule {}
