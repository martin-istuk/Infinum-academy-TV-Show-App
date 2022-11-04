import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { AuthService } from "src/app/services/auth/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly formBuilder: FormBuilder
	) {}

	public loginForm?: FormGroup;
	ngOnInit(): void {
		this.loginForm = this.formBuilder.group(
			{
				email: ["", [Validators.required, Validators.email]],
				password: ["", [Validators.required, Validators.minLength(8)]]
			},
			{
				updateOn: "change"
			}
		);
	}

	public getErrMsgEmail() {
		if (this.loginForm?.controls["email"].hasError("required")) {
			return "You must enter a value";
		}
		return this.loginForm?.controls["email"].hasError("email") ? "Not a valid email" : "";
	}

	public getErrMsgPass() {
		return this.loginForm?.controls["password"].hasError("required") ? "You must enter a value" : "";
	}

	private subscription?: Subscription;
	public loadingInProgress: boolean = false;

	public onFormSubmit(event: Event): void {
		event.preventDefault();
		const email = this.loginForm?.controls["email"].value as string;
		const password = this.loginForm?.controls["password"].value as string;
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
