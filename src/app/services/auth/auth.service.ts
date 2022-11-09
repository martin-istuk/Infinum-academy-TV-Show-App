import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import {
	Auth,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	UserCredential,
	updateProfile,
	onAuthStateChanged
} from "@angular/fire/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "@angular/fire/storage";
import { BehaviorSubject, from, of, Observable, switchMap, EMPTY, tap, map } from "rxjs";

import { AppUser } from "src/app/interfaces/appUser.model";

@Injectable({ providedIn: "root" })
export class AuthService {
	private _user$ = new BehaviorSubject<AppUser | null>(null);
	public user$ = this._user$.asObservable();

	constructor(private afAuth: Auth, private router: Router) {}

	public init(): void {
		console.log(this.afAuth.currentUser)
		const check: string | null = localStorage.getItem("userCredential");
		if (check) {
			const userCredential: UserCredential = JSON.parse(check);
			onAuthStateChanged(this.afAuth, (user) => {
				if (user) {
					this.authSuccessful(userCredential);
				}
			} )
		}
	}

	private authSuccessful(userCredential: UserCredential): Observable<AppUser> {
		console.log(this.afAuth.currentUser)
		const user = new AppUser({
			uid: userCredential.user.uid,
			email: userCredential.user.email as string,
			photoURL: this.afAuth.currentUser?.photoURL || ""
		});
		this._user$.next(user);
		return of(user);
	}

	public registerUser(email: string, password: string): Observable<AppUser> {
		return from(createUserWithEmailAndPassword(this.afAuth, email, password)).pipe(
			switchMap((userCredential: UserCredential) => {
				localStorage.setItem("userCredential", JSON.stringify(userCredential));
				return this.authSuccessful(userCredential);
			})
		);
	}

	public loginUser(email: string, password: string): Observable<AppUser> {
		return from(signInWithEmailAndPassword(this.afAuth, email, password)).pipe(
			switchMap((userCredential: UserCredential) => {
				localStorage.setItem("userCredential", JSON.stringify(userCredential));
				return this.authSuccessful(userCredential);
			})
		);
	}

	public logoutUser(): void {
		localStorage.removeItem("userCredential");
		this.afAuth.signOut();
		this._user$.next(null);
		this.router.navigate(["auth", "login"]);
	}

	public uploadPhoto(file: File): Observable<any> {
		const fbUser = getAuth().currentUser;
		const storage = getStorage();
		if (fbUser !== null) {
			uploadBytes(ref(storage, "UsersProfilePhotos/" + fbUser.uid), file);
			const photoURL: string =
				"gs://tv-show-app-a17a3.appspot.com/UsersProfilePhotos/" + fbUser.uid;
			updateProfile(fbUser, { photoURL: photoURL });
		}
		return EMPTY;
	}
}
