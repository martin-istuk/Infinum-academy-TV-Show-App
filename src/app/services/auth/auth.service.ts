import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import {
	Auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged
} from "@angular/fire/auth";
import { BehaviorSubject, from, map, Observable } from "rxjs";

import { User } from "src/app/interfaces/user.model";
import { IUser } from "src/app/interfaces/user.interface";

@Injectable({ providedIn: "root" })
export class AuthService {
	constructor(private fbAuth: Auth, private router: Router) {}

	private _user$ = new BehaviorSubject<User | null>(null);
	public user$ = this._user$.asObservable();

	public init(): void {
		onAuthStateChanged(this.fbAuth, (user) => {
			if (user && user.email && user.uid) {
				this.authSuccessful(user.email, user.uid);
			}
		});
	}

	private authSuccessful(email: string, uid: string): void {
		const user: User = new User({
			id: uid,
			email: email,
			imageUrl: null
		} as IUser);
		this._user$.next(user);
	}

	public registerUser(email: string, password: string): Observable<null> {
		return from(createUserWithEmailAndPassword(this.fbAuth, email, password)).pipe(
			map((userCredential) => {
				this.authSuccessful(email, userCredential.user.uid);
				return null;
			})
		);
	}

	public loginUser(email: string, password: string): Observable<null> {
		return from(signInWithEmailAndPassword(this.fbAuth, email, password)).pipe(
			map((userCredential) => {
				this.authSuccessful(email, userCredential.user.uid);
				return null;
			})
		);
	}

	public logoutUser(): void {
		this.fbAuth.signOut();
		this._user$.next(null);
		this.router.navigate(["auth", "login"]);
	}
}
