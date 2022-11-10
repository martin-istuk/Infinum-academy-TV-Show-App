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
		const check = localStorage.getItem("userCredential");
		if (check) {
			const userCredential: UserCredential = JSON.parse(check);
			const newUser = new AppUser({
				uid: userCredential.user.uid,
				email: userCredential.user.email as string,
				photoURL: userCredential.user.photoURL as string
			});
			this._user$.next(newUser);
		}
		onAuthStateChanged(this.afAuth, (user) => {
			if (user) {
				this.getUserPhotoUrl(user.uid).subscribe({
					next: (url: string) => {
						const newUser = new AppUser({
							uid: user.uid,
							email: user.email as string,
							photoURL: url
						});
						this._user$.next(newUser);
					}
				})
			}
		} )
	}

	public getUserPhotoUrl(uid: string): Observable<string> {
		const afStorage = getStorage();
		const pathRef = ref(afStorage, "UsersProfilePhotos/" + uid);
		return from(getDownloadURL(pathRef))
	}

	public createAppUser(userCredential: UserCredential): AppUser {
		localStorage.setItem("userCredential", JSON.stringify(userCredential));
		const appUser = new AppUser({
			uid: userCredential.user.uid,
			email: userCredential.user.email as string,
			photoURL: userCredential.user.photoURL as string
		});
		this._user$.next(appUser);
		return appUser;
	}

	public registerUser(email: string, password: string): Observable<AppUser> {
		return from(createUserWithEmailAndPassword(this.afAuth, email, password)).pipe(
			switchMap((userCredential: UserCredential) => {
				return of(this.createAppUser(userCredential));
			})
		);
	}

	public loginUser(email: string, password: string): Observable<AppUser> {
		return from(signInWithEmailAndPassword(this.afAuth, email, password)).pipe(
			switchMap((userCredential: UserCredential) => {
				return of(this.createAppUser(userCredential));
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
