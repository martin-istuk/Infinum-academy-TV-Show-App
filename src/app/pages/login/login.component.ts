import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { AuthService } from "src/app/services/auth/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnDestroy {
	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly formBuilder: FormBuilder
	) {}

	private subscription?: Subscription;
	public loadingInProgress: boolean = false;

	public loginForm = this.formBuilder.group({
		email: ["", [Validators.required, Validators.email]],
		password: ["", [Validators.required, Validators.minLength(8)]]
	});

	public getErrMsgEmail() {
		if (this.loginForm.controls.email.hasError("required")) {
			return "You must enter a value";
		}
		return this.loginForm.controls.email.hasError("email") ? "Not a valid email" : "";
	}

	public getErrMsgPass() {
		return this.loginForm.controls.password.hasError("required") ? "You must enter a value" : "";
	}

	public onFormSubmit(event: Event): void {
		event.preventDefault();
		const email = this.loginForm.controls.email.value as string;
		const password = this.loginForm.controls.password.value as string;
		this.loadingInProgress = true;
		this.subscription = this.authService.loginUser(email, password).subscribe({
			next: () => {
				this.loadingInProgress = false;
				this.router.navigate([""]);
			},
			error: (error) => {
				this.loadingInProgress = false;
				window.alert(error);
			}
		});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
