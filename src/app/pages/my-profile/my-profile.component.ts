import { Component } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";

import { AppUser } from "src/app/interfaces/appUser.model";
import { AuthService } from "src/app/services/auth/auth.service";
import { UploadComponent } from "./upload/upload.component";

@Component({
	selector: "app-my-profile",
	templateUrl: "./my-profile.component.html",
	styleUrls: ["./my-profile.component.scss"]
})
export class MyProfileComponent {
	public user$: Observable<AppUser | null>;

	constructor(private authService: AuthService, public dialog: MatDialog) {
		this.user$ = this.authService.user$;
	}

	public openDialog(): void {
		const dialogRef = this.dialog.open(UploadComponent);
	}
}
