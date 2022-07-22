import { ILoginFormData } from './login-form-data.interface';

export interface IRegisterFormData extends ILoginFormData {
	password_confirmation: string;
}
