import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { IAuthFormData } from 'src/app/interfaces/auth-form-data.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { emailMartinValidator } from 'src/app/validators/email-validator.directive';

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

	public registerForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email, emailMartinValidator(/martin/i)]),
		password: new FormControl('', [Validators.required, Validators.minLength(8)]),
		password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
	});

	public getErrMsgEmail() {
		if (this.registerForm.controls.email.hasError('required')) {
			return 'You must enter a value';
		} else if (this.registerForm.controls.email.hasError('email')) {
			return 'Not a valid email';
		}
		return this.registerForm.controls.email.hasError('forbiddenName') ? 'String "Martin" not allowed' : '';
	}

	public getErrMsgPass() {
		if (this.registerForm.controls.password.value !== null) {
			return this.registerForm.controls.password.hasError('required') ||
				this.registerForm.controls.password.value.length < 8
				? 'You must enter a value at least 8 characters long'
				: '';
		} else {
			return '';
		}
	}

	public getErrMsgPassConf() {
		if (this.registerForm.controls.password_confirmation.value !== null) {
			return this.registerForm.controls.password_confirmation.hasError('required') ||
				this.registerForm.controls.password_confirmation.value.length < 8
				? 'You must enter a value at least 8 characters long'
				: '';
		} else {
			return '';
		}
	}

	public onFormSubmit(event: Event): void {
		event.preventDefault();

		this.loadingInProgress = !this.loadingInProgress;

		this.subscription = this.authService
			.registerUser({
				email: this.registerForm.controls.email.value,
				password: this.registerForm.controls.password.value,
				password_confirmation: this.registerForm.controls.password_confirmation.value,
			} as IAuthFormData)
			.subscribe({
				next: (response) => {
					console.log(response);
					this.loadingInProgress = !this.loadingInProgress;
					this.router.navigate(['']);
				},
				error: (error) => {
					console.error(error);
					this.loadingInProgress = !this.loadingInProgress;
					if (error.status === 422) {
						this.snackBar.open('Email has already been taken.');
					}
				},
			});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
