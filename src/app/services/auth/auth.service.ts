import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import {
	Auth,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	UserCredential,
	updateProfile
} from "@angular/fire/auth";
import { doc, DocumentData, DocumentSnapshot, Firestore, getDoc } from "@angular/fire/firestore";
import { deleteObject, getStorage, ref, uploadBytes, getDownloadURL } from "@angular/fire/storage";
import { BehaviorSubject, from, of, Observable, switchMap, EMPTY } from "rxjs";

import { User } from "src/app/interfaces/user.model";

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
		const uid: string = userCredential.user.uid as string;
		const email: string = userCredential.user.email as string;
		let photoURL: string = "";

		const fbUser = getAuth().currentUser;
		const storage = getStorage();
		if (fbUser !== null) {
			const pathReference = ref(storage, "UsersProfilePhotos/" + fbUser.uid);
			getDownloadURL(pathReference).then( (url) => {
				photoURL = url;
				const user: User = new User({ uid: uid, email: email, photoURL: photoURL });
				this._user$.next(user);
				return of(user);
			} );
		}

		const user: User = new User({ uid: uid, email: email, photoURL: photoURL });
		this._user$.next(user);
		return of(user);
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

	public uploadPhoto(file: File): Observable<any> {
		const fbUser = getAuth().currentUser;
		const storage = getStorage();
		if (fbUser !== null) {
			uploadBytes(ref(storage, "UsersProfilePhotos/" + fbUser.uid), file);
			const photoURL: string = "gs://tv-show-app-a17a3.appspot.com/UsersProfilePhotos/" + fbUser.uid;
			updateProfile(fbUser, { photoURL: photoURL });
		}
		// return
		return EMPTY;
	}
}
