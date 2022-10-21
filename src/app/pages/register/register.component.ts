import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { AuthService } from "src/app/services/auth/auth.service";
import { passMatchValidator } from "src/app/validators/pass-match-validator.directive";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnDestroy {
	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly formBuilder: FormBuilder
	) {}

	private subscription?: Subscription;
	public loadingInProgress: boolean = false;

	public registerForm = new FormGroup(
		{
			email: new FormControl("", [Validators.required, Validators.email]),
			password: new FormControl("", [Validators.required, Validators.minLength(8)]),
			passwordConfirmation: new FormControl("", [Validators.required, Validators.minLength(8)])
		},
		{
			updateOn: "blur",
			validators: [passMatchValidator("password", "passwordConfirmation")]
		}
	);

	// public registerForm: FormGroup = this.formBuilder.group(
	// 	{
	// 		email: ["", [Validators.required, Validators.email]],
	// 		password: ["", [Validators.required, Validators.minLength(8)]],
	// 		passwordConfirmation: ["", [Validators.required, Validators.minLength(8)]]
	// 	},
	// 	{
	// 		updateOn: "blur",
	// 		validators: [passMatchValidator("password", "passwordConfirmation")]
	// 	}
	// );

	public getErrMsgEmail() {
		if (this.registerForm.controls["email"].hasError("required")) {
			return "You must enter a value";
		}
		return this.registerForm.controls["email"].hasError("email") ? "Not a valid email" : "";
	}

	public getErrMsgPass() {
		const passwordInput = this.registerForm.controls["password"];
		if (passwordInput.value !== null) {
			if (passwordInput.hasError("required") || passwordInput.value.length < 8) {
				return "You must enter a value at least 8 characters long";
			}
			return "";
		}
		return "";
	}

	public getErrMsgPassConf() {
		const passConfInput = this.registerForm.controls["email"];
		if (passConfInput.value !== null) {
			if (passConfInput.hasError("required") || passConfInput.value.length < 8) {
				return "You must enter a value at least 8 characters long";
			}
			return "";
		}
		return "";
	}

	public passwordMatchError() {
		return this.registerForm.getError("mismatch") && this.registerForm.get("passwordConfirmation")?.touched;
	}

	public onFormSubmit(event: Event): void {
		event.preventDefault();
		const email = this.registerForm.controls["email"].value as string;
		const password = this.registerForm.controls["password"].value as string;
		const passConf = this.registerForm.controls["passwordConfirmation"].value as string;
		if (password !== passConf) {
			window.alert("\nPASSWORD ERROR\nPasswords do not match!");
		} else {
			this.loadingInProgress = true;
			this.subscription = this.authService.registerUser(email, password).subscribe({
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
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
