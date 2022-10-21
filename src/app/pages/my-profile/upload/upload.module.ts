import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from "@angular/material/button";

import { UploadComponent } from "./upload.component";

@NgModule({
	declarations: [UploadComponent],
	imports: [CommonModule, MatButtonModule],
	exports: [UploadComponent]
})
export class UploadModule {}
