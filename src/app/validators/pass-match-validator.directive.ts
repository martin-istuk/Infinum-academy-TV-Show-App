import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passMatchValidator(password: string, passConf: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const password = control.get('password');
		const passConf = control.get('password_confirmation');

		return password && passConf && password.value !== passConf.value ? { mismatch: true } : null;
	};
}
