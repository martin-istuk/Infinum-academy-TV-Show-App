import { ILoginFormData } from "./login-form-data.interface";

export interface IRegisterFormData extends ILoginFormData {
	passwordConfirmation: string;
}
