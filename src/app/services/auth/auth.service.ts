import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, map, tap, BehaviorSubject, EMPTY, catchError } from 'rxjs';

import { IRegisterFormData } from 'src/app/interfaces/register-form-data.interface';
import { ILoginFormData } from 'src/app/interfaces/login-form-data.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { User } from 'src/app/interfaces/user.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private readonly http: HttpClient, private readonly router: Router) {}

	private _user$ = new BehaviorSubject<User | null>(null);
	public user$ = this._user$.asObservable();

	public init(): Observable<User> {
		return this.http.get<{ user: IUser }>('https://tv-shows.infinum.academy/users/me').pipe(
			catchError(() => {
				console.log('login status initialization fail');
				return EMPTY;
			}),
			map((data) => {
				return new User(data.user);
			}),
			tap((user) => this._user$.next(user)),
		);
	}

	public registerUser(userData: IRegisterFormData): Observable<User | null> {
		return this.http
			.post<{ user: IUser }>('https://tv-shows.infinum.academy/users', userData, { observe: 'response' })
			.pipe(
				tap((response) => {
					const token = response.headers.get('access-token') || '';
					const client = response.headers.get('client') || '';
					const uid = response.headers.get('uid') || '';

					localStorage.setItem('access-token', token);
					localStorage.setItem('client', client);
					localStorage.setItem('uid', uid);
				}),
				map((response) => {
					if (response.body) {
						this._user$.next(new User(response.body.user));
					}
					return null;
				}),
			);
	}

	public loginUser(userData: ILoginFormData): Observable<User | null> {
		return this.http
			.post<{ user: IUser }>('https://tv-shows.infinum.academy/users/sign_in', userData, { observe: 'response' })
			.pipe(
				tap((response) => {
					const token = response.headers.get('access-token') || '';
					const client = response.headers.get('client') || '';
					const uid = response.headers.get('uid') || '';

					localStorage.setItem('access-token', token);
					localStorage.setItem('client', client);
					localStorage.setItem('uid', uid);
				}),
				map((response) => {
					if (response.body) {
						this._user$.next(new User(response.body.user));
					}
					return null;
				}),
			);
	}

	public logoutUser(): void {
		localStorage.removeItem('access-token');
		localStorage.removeItem('client');
		localStorage.removeItem('uid');
		this.router.navigate(['auth', 'login']);
	}
}
