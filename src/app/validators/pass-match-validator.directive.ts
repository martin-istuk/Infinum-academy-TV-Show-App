import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passMatchValidator(password: string, passConf: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const passwordInput = control.get(password);
		const passConfInput = control.get(passConf);

		return passwordInput && passConfInput && passwordInput.value !== passConfInput.value ? { mismatch: true } : null;
	};
}
