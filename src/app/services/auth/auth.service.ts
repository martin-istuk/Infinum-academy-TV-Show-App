import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, from, map } from 'rxjs';
import {
	Auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	UserCredential,
} from '@angular/fire/auth';

import { User } from 'src/app/interfaces/user.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private fbAuth: Auth) {}

	private _user$ = new BehaviorSubject<User | null>(null);
	public user$ = this._user$.asObservable();

	public async init(): Promise<void> {
		// await setPersistence(fbAuth, browserLocalPersistence);
	}

	private authSuccessful(email: string, uid: string): void {
		const user: User = { id: uid, email: email, imageUrl: null };
		this._user$.next(user);
	}

	public registerUser(email: string, password: string): Observable<null> {
		return from(createUserWithEmailAndPassword(this.fbAuth, email, password)).pipe(
			map((userCredential) => {
				this.authSuccessful(email, userCredential.user.uid);
				return null;
			}),
		);
	}

	public loginUser(email: string, password: string): Observable<null> {
		return from(signInWithEmailAndPassword(this.fbAuth, email, password)).pipe(
			map((userCredential) => {
				this.authSuccessful(email, userCredential.user.uid);
				return null;
			}),
		);
	}

	public logoutUser(): Observable<void> {
		return from(signOut(this.fbAuth));

		// INFINUM ACADEMY:
		// localStorage.removeItem("access-token");
		// localStorage.removeItem("client");
		// localStorage.removeItem("uid");
		// this.router.navigate(["auth", "login"]);
	}
}
