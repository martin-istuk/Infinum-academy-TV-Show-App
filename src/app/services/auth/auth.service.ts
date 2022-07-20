import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IAuthFormData } from 'src/app/interfaces/auth-form-data.interface';
import { IUser } from 'src/app/interfaces/user.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private readonly http: HttpClient) {}

	public registerUser(userData: IAuthFormData): Observable<IUser> {
		return this.http.post<IUser>('https://tv-shows.infinum.academy/users', userData, { withCredentials: true });
	}

	public loginUser(userData: IAuthFormData): Observable<IUser> {
		return this.http.post<IUser>('https://tv-shows.infinum.academy/users/sign_in', userData, { withCredentials: true });
	}
}
