import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, UrlSerializer } from '@angular/router';
import { Subscription } from 'rxjs';

import { IAuthFormData } from 'src/app/interfaces/auth-form-data.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
	constructor(private readonly authService: AuthService, private readonly router: Router) {}

	private subscription?: Subscription;
	public loadingInProgress: boolean = false;

	public registerForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.minLength(8)]),
		password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
	});

	public getErrMsgEmail() {
		if (this.registerForm.controls.email.hasError('required')) {
			return 'You must enter a value';
		}
		return this.registerForm.controls.email.hasError('email') ? 'Not a valid email' : '';
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
				},
			});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
