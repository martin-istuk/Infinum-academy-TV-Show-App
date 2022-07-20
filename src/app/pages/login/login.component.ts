import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IAuthFormData } from 'src/app/interfaces/auth-form-data.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
	constructor(private readonly authService: AuthService, private readonly router: Router) {}

	private subscription?: Subscription;
	public loadingInProgress: boolean = false;

	public loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.minLength(8)]),
	});

	public getErrMsgEmail() {
		if (this.loginForm.controls.email.hasError('required')) {
			return 'You must enter a value';
		}
		return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
	}

	public getErrMsgPass() {
		return this.loginForm.controls.password.hasError('required') ? 'You must enter a value' : '';
	}

	public onFormSubmit(event: Event): void {
		event.preventDefault();

		this.loadingInProgress = !this.loadingInProgress;

		this.subscription = this.authService
			.loginUser({
				email: this.loginForm.controls.email.value,
				password: this.loginForm.controls.password.value,
			} as IAuthFormData)
			.subscribe({
				next: (response) => {
					console.log('ABC');
					this.loadingInProgress = !this.loadingInProgress;
					console.log(response);
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
