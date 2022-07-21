import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IRegisterFormData } from 'src/app/interfaces/register-form-data.interface';
import { ILoginFormData } from 'src/app/interfaces/login-form-data.interface';
import { IUser } from 'src/app/interfaces/user.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private readonly http: HttpClient) {}

	public registerUser(userData: IRegisterFormData): Observable<IUser> {
		return this.http.post<IUser>('https://tv-shows.infinum.academy/users', userData);
	}

	public loginUser(userData: ILoginFormData): Observable<IUser> {
		return this.http.post<IUser>('https://tv-shows.infinum.academy/users/sign_in', userData);
	}
}
