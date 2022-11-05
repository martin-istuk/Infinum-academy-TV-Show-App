import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "@angular/fire/auth";
import { doc, DocumentData, DocumentSnapshot, Firestore, getDoc } from "@angular/fire/firestore";
import { BehaviorSubject, from, map, tap, Observable, switchMap } from "rxjs";

import { User } from "src/app/interfaces/user.model";
import { IUser } from "src/app/interfaces/user.interface";

@Injectable({ providedIn: "root" })
export class AuthService {
	constructor(private fbAuth: Auth, private fbFirestore: Firestore, private router: Router) {}

	private _user$ = new BehaviorSubject<User | null>(null);
	public user$ = this._user$.asObservable();

	public init(): void {
		const check: string | null = localStorage.getItem("userCredential");
		if (check) {
			const userCredential: UserCredential = JSON.parse(check);
			this.authSuccessful(userCredential);
		}
	}

	private authSuccessful(userCredential: UserCredential): Observable<User> {
		const uid: string = userCredential.user.uid;
		const email: string = userCredential.user.email as string;
		let photoURL: string = "";

		const user: User = new User({ uid: uid, email: email, photoURL: photoURL });
		this._user$.next(user);

		return from(getDoc(doc(this.fbFirestore, "Users", uid))).pipe(
			map((docSnapshot: DocumentSnapshot<DocumentData>) => {
				const userData: DocumentData | undefined = docSnapshot.data();
				if (userData) {
					photoURL = userData["photoURL"];
				}
				const user: User = new User({ uid: uid, email: email, photoURL: photoURL });
				this._user$.next(user);
				return user;
			})
		);
	}

	public registerUser(email: string, password: string): Observable<User> {
		return from(createUserWithEmailAndPassword(this.fbAuth, email, password)).pipe(
			switchMap((userCredential: UserCredential) => {
				localStorage.setItem("userCredential", JSON.stringify(userCredential));
				return this.authSuccessful(userCredential);
			})
		);
	}

	public loginUser(email: string, password: string): Observable<User> {
		return from(signInWithEmailAndPassword(this.fbAuth, email, password)).pipe(
			switchMap((userCredential: UserCredential) => {
				localStorage.setItem("userCredential", JSON.stringify(userCredential));
				return this.authSuccessful(userCredential);
			})
		);
	}

	public logoutUser(): void {
		localStorage.removeItem("userCredential");
		this.fbAuth.signOut();
		this._user$.next(null);
		this.router.navigate(["auth", "login"]);
	}
}
