import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAuthFormData } from 'src/app/interfaces/auth-form-data.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	constructor(private readonly authService: AuthService) {}

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
		return this.registerForm.controls.password.hasError('required')
			? 'You must enter a value with at least 8 characters.'
			: '';
	}

	public getErrMsgPassConf() {
		return this.registerForm.controls.password_confirmation.hasError('required')
			? 'You must enter a value with at least 8 characters.'
			: '';
	}

	public onFormSubmit(event: Event): void {
		event.preventDefault();

		this.loadingInProgress = !this.loadingInProgress;

		this.authService
			.registerUser({
				email: this.registerForm.controls.email.value,
				password: this.registerForm.controls.password.value,
			} as IAuthFormData)
			.subscribe();
	}
}
