import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UploadComponent } from './upload/upload.component';

@Component({
	selector: 'app-my-profile',
	templateUrl: './my-profile.component.html',
	styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent {
	constructor(private readonly authService: AuthService, public dialog: MatDialog) {}

	public user$ = this.authService.user$;

	public openDialog(): void {
		const dialogRef = this.dialog.open(UploadComponent);
	}

}
