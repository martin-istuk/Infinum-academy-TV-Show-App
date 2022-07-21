import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { ILoginFormData } from 'src/app/interfaces/login-form-data.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { emailMartinValidator } from 'src/app/validators/email-validator.directive';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private snackBar: MatSnackBar,
	) {}

	private subscription?: Subscription;
	public loadingInProgress: boolean = false;

	public loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email, emailMartinValidator(/martin/i)]),
		password: new FormControl('', [Validators.required, Validators.minLength(8)]),
	});

	public getErrMsgEmail() {
		if (this.loginForm.controls.email.hasError('required')) {
			return 'You must enter a value';
		} else if (this.loginForm.controls.email.hasError('email')) {
			return 'Not a valid email';
		}
		return this.loginForm.controls.email.hasError('forbiddenName') ? 'String "Martin" not allowed' : '';
	}

	public getErrMsgPass() {
		return this.loginForm.controls.password.hasError('required') ? 'You must enter a value' : '';
	}

	public onFormSubmit(event: Event): void {
		event.preventDefault();

		this.loadingInProgress = true;

		this.subscription = this.authService
			.loginUser({
				email: this.loginForm.controls.email.value,
				password: this.loginForm.controls.password.value,
			} as ILoginFormData)
			.subscribe({
				next: (response) => {
					console.log(response);
					this.loadingInProgress = false;
					this.router.navigate(['']);
				},
				error: (error) => {
					console.error(error);
					this.loadingInProgress = false;
					if (error.status === 401) {
						this.snackBar.open('Invalid password.', '', { duration: 3000 });
					}
				},
			});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
