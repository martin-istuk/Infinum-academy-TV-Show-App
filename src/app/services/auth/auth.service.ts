import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, from } from 'rxjs';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	setPersistence,
	browserLocalPersistence,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { fbAuth, fbFirestore } from '../../app.module'; // local Firebase app instance
import { IUser } from 'src/app/interfaces/user.interface';
import { User } from 'src/app/interfaces/user.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private readonly router: Router) {}

	private _user$ = new BehaviorSubject<User | null>(null);
	public user$ = this._user$.asObservable();

	// AuthInterceptor handles appending user uid, token etc. to every http request

	public async init(): Promise<void> {
		// await setPersistence(fbAuth, browserLocalPersistence);
		// if (fbAuth.currentUser) {
		// 	const uid: string | undefined = fbAuth.currentUser?.uid;
		// 	const user = new User(
		// 		(await getDoc(doc(fbFirestore, "Users", uid as string))).data() as IUser
		// 	);
		// 	user.id = uid as string;
		// 	localStorage.setItem("uid", uid as string);
		// 	this._user$.next(user);
		// 	this.router.navigate( [ "" ] );
		// } else {
		// 	window.alert("eeee");
		// }
	}

	public registerUser(email: string, password: string): Observable<User | null> {
		let user: User | null = null;
		const observable$ = from(
			createUserWithEmailAndPassword(fbAuth, email, password)
				.then(async () => {
					const uid: string | undefined = fbAuth.currentUser?.uid;
					user = {
						id: uid as string,
						email: email,
						imageUrl: null,
					};
					await setDoc(doc(fbFirestore, 'Users', uid as string), user);
					localStorage.setItem('uid', uid as string);
					this._user$.next(user);
					this.router.navigate(['']);
					return user;
				})
				.catch((error) => {
					window.alert(error);
					return null;
				}),
		);
		return observable$;
	}

	public loginUser(email: string, password: string): Observable<User | null> {
		let user: User | null = null;
		const observable$ = from(
			signInWithEmailAndPassword(fbAuth, email, password)
				.then(async () => {
					const uid: string | undefined = fbAuth.currentUser?.uid;
					user = new User((await getDoc(doc(fbFirestore, 'Users', uid as string))).data() as IUser);
					user.id = uid as string;
					localStorage.setItem('uid', uid as string);
					this._user$.next(user);
					this.router.navigate(['']);
					return user;
				})
				.catch((error) => {
					window.alert(error);
					return null;
				}),
		);
		return observable$;
	}

	public logoutUser(): void {
		// INFINUM ACADEMY:
		// localStorage.removeItem("access-token");
		// localStorage.removeItem("client");
		// localStorage.removeItem("uid");
		// this.router.navigate(["auth", "login"]);
	}
}
