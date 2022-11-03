import { IUser } from "./user.interface";

export class User {
	public uid: string;
	public email: string;
	public photoURL: string;

	constructor(user: IUser) {
		this.uid = user.uid;
		this.email = user.email;
		this.photoURL = user.photoURL;
	}
}
