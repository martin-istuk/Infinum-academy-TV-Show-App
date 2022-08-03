import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { IRegisterFormData } from 'src/app/interfaces/register-form-data.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { emailMartinValidator } from 'src/app/validators/email-validator.directive';
import { passMatchValidator } from 'src/app/validators/pass-match-validator.directive';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private snackBar: MatSnackBar,
	) {}

	private subscription?: Subscription;
	public loadingInProgress: boolean = false;

	public registerForm = new FormGroup(
		{
			email: new FormControl('', [Validators.required, Validators.email, emailMartinValidator(/martin/i)]),
			password: new FormControl('', [Validators.required, Validators.minLength(8)]),
			password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
		},
		[passMatchValidator('password', 'password_confirmation')],
	);

	public getErrMsgEmail() {
		if (this.registerForm.controls.email.hasError('required')) {
			return 'You must enter a value';
		} else if (this.registerForm.controls.email.hasError('email')) {
			return 'Not a valid email';
		}
		return this.registerForm.controls.email.hasError('forbiddenName') ? 'String "Martin" not allowed' : '';
	}

	public getErrMsgPass() {
		const passwordInput = this.registerForm.controls.password;
		if (passwordInput.value !== null) {
			if (passwordInput.hasError('required') || passwordInput.value.length < 8) {
				return 'You must enter a value at least 8 characters long';
			}
			return '';
		}
		return '';
	}

	public getErrMsgPassConf() {
		const passConfInput = this.registerForm.controls.password_confirmation;
		if (passConfInput.value !== null) {
			if (passConfInput.hasError('required') || passConfInput.value.length < 8) {
				return 'You must enter a value at least 8 characters long';
			}
			return '';
		}
		return '';
	}

	public passwordMatchError() {
		return this.registerForm.getError('mismatch') && this.registerForm.get('password_confirmation')?.touched;
	}

	public onFormSubmit(event: Event): void {
		event.preventDefault();

		this.loadingInProgress = true;

		this.subscription = this.authService
			.registerUser({
				email: this.registerForm.controls.email.value,
				password: this.registerForm.controls.password.value,
				password_confirmation: this.registerForm.controls.password_confirmation.value,
			} as IRegisterFormData)
			.subscribe({
				next: (response) => {
					this.loadingInProgress = false;
					this.router.navigate(['']);
				},
				error: (error) => {
					console.error(error);
					this.loadingInProgress = false;
					if (error.status === 422) {
						this.snackBar.open('This email is already registered.', '', { duration: 3000 });
					}
				},
			});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
