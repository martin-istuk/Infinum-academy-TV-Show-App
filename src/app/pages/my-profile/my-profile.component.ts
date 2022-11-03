import { Component, OnInit } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { User } from "src/app/interfaces/user.model";

import { AuthService } from "src/app/services/auth/auth.service";
import { UploadComponent } from "./upload/upload.component";

@Component({
	selector: "app-my-profile",
	templateUrl: "./my-profile.component.html",
	styleUrls: ["./my-profile.component.scss"]
})
export class MyProfileComponent implements OnInit {
	constructor(private authService: AuthService, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.user$ = this.authService.user$;
	}

	public user$?: Observable<User | null>;

	public openDialog(): void {
		const dialogRef = this.dialog.open(UploadComponent);
	}
}
