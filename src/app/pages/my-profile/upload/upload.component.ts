import { Component } from "@angular/core";

import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
	selector: "app-upload",
	templateUrl: "./upload.component.html",
	styleUrls: ["./upload.component.scss"]
})
export class UploadComponent {
	constructor(public dialogRef: MatDialogRef<UploadComponent>, private authService: AuthService) {}

	public file: File | undefined;

	public previewImgUrl: string = "";
	public uploadBtnEnabled: boolean = false;

	public hoverEffect: boolean = false;
	public hoverLabelContent: string = "Click here to choose the picture or drop the image here.";

	public onDragOver(event: DragEvent): void {
		event.preventDefault();
		this.hoverEffect = true;
		this.hoverLabelContent = "Drop it!";
	}

	public onDragLeave(event: DragEvent): void {
		event.preventDefault();
		this.hoverEffect = false;
		this.hoverLabelContent = "Click here to choose the picture or drop the image here.";
	}

	public onFileDrop(event: DragEvent): void {
		event.preventDefault();
		this.hoverEffect = false;
		this.hoverLabelContent = "Click here to choose the picture or drop the image here.";

		this.file = event.dataTransfer?.files[0];

		if (this.file) {
			this.uploadBtnEnabled = true;
			this.previewImgUrl = "url(" + URL.createObjectURL(this.file) + ")";
		}
	}

	public onFileInputChange(event: any): void {
		this.hoverEffect = false;
		this.hoverLabelContent = "Click here to choose the picture or drop the image here.";

		this.file = event.target.files[0] || undefined;

		if (this.file) {
			this.uploadBtnEnabled = true;
			this.previewImgUrl = "url(" + URL.createObjectURL(this.file) + ")";
		}
	}

	public onUploadImg(): void {
		this.authService.uploadPhoto(this.file as File).subscribe({
			complete: () => {
				this.onCancel()
			}
		});
	}

	onCancel(): void {
		this.dialogRef.close();
	}
}
