import { IUser } from './user.interface';

export class User {
	public id: string;
	public email: string;
	public imageUrl: string | null;

	constructor(user: IUser) {
		this.id = user.id;
		this.email = user.email;
		this.imageUrl = user.imageUrl;
	}
}
