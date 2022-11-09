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
import { user } from "rxfire/auth";

@Injectable({ providedIn: "root" })
export class AuthService {
	private _user$ = new BehaviorSubject<AppUser | null>(null);
	public user$ = this._user$.asObservable();

	constructor(private afAuth: Auth, private router: Router) {}

	public init(): void {
		onAuthStateChanged(this.afAuth, (user) => {
			if (user) {
				const newUser = new AppUser({
					uid: user.uid,
					email: user.email as string,
					photoURL: user.photoURL as string
				});
				this._user$.next(newUser);
				this.router.navigate([""])
			}
		} )
	}

	private authSuccessful(userCredential: UserCredential): Observable<AppUser> {
		const afStorage = getStorage();
		const pathRef = ref(afStorage, "UsersProfilePhotos/" + userCredential.user.uid);
		// getDownloadURL() .....................
		const user = new AppUser({
			uid: userCredential.user.uid,
			email: userCredential.user.email as string,
			photoURL: this.afAuth.currentUser?.photoURL as string
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
		const afStorage = getStorage();
		if (fbUser !== null) {
			uploadBytes(ref(afStorage, "UsersProfilePhotos/" + fbUser.uid), file);
			const photoURL: string =
				"gs://tv-show-app-a17a3.appspot.com/UsersProfilePhotos/" + fbUser.uid;
			updateProfile(fbUser, { photoURL: photoURL });
		}
		return EMPTY;
	}
}
