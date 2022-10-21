import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { LoginComponent } from "./login.component";

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatSnackBarModule
	],
	exports: [LoginComponent]
})
export class LoginModule {}
