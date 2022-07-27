import { IUser } from './user.interface';

export class User {
	public id: string;
	public email: string;
	public image_url: string | null;

	constructor(user: IUser) {
		this.id = user.id;
		this.email = user.email;
		this.image_url = user.image_url;
	}
}
