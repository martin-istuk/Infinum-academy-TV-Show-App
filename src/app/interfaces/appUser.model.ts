import { IAppUser } from "./appUser.interface";

export class AppUser {
	public uid: string;
	public email: string;
	public photoURL: string;

	constructor(user: IAppUser) {
		this.uid = user.uid;
		this.email = user.email;
		this.photoURL = user.photoURL;
	}
}
