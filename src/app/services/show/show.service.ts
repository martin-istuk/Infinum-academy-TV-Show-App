import { Injectable } from "@angular/core";

import {
	Firestore,
	getDocs,
	collection,
	QuerySnapshot,
	QueryDocumentSnapshot,
	doc,
	query,
	where,
	updateDoc,
	setDoc,
	arrayUnion,
	arrayRemove
} from "@angular/fire/firestore";
import { BehaviorSubject, from, map, switchMap, Observable, of } from "rxjs";

import { IShow } from "src/app/interfaces/show.interface";
import { Show } from "src/app/interfaces/show.model";
import { Review } from "src/app/interfaces/review.model";

@Injectable({ providedIn: "root" })
export class ShowService {
	constructor(private firestore: Firestore) {}

	private _shows$ = new BehaviorSubject<Array<Show>>([]);
	public shows$: Observable<Array<Show>> = this._shows$.asObservable();

	public topRatedShows$: Observable<Array<Show>> = this.shows$.pipe(
		map((shows: Array<Show>) => {
			return shows.filter((show: Show) => {
				show.rating !== null && show.rating >= 8;
			});
		})
	);

	public getAllShows(): Observable<Array<Show>> {
		return from(getDocs(collection(this.firestore, "Shows"))).pipe(
			map((querySnapshot: QuerySnapshot) => {
				const shows: Array<Show> = [];
				querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
					shows.push(new Show(doc.data() as IShow));
				});
				this._shows$.next(shows);
				return shows;
			})
		);
	}

	public getTopRatedShows(): Observable<Array<Show>> {
		return this.getAllShows().pipe(
			map((shows: Array<Show>) => {
				return shows
					.filter((show: Show) => {
						return show.rating !== null && show.rating >= 4;
					})
					.sort((a, b) => (b.rating as number) - (a.rating as number));
			})
		);
	}

	public getShowById(id: string): Observable<Show> {
		return this.getAllShows().pipe(
			map((shows: Array<Show>) => {
				return shows.filter((show: Show) => {
					return show.urlTitle === id;
				})[0];
			})
		);
	}

	public addReview(userEmail: string, showTitle: string, reviewData: any): Observable<any> {
		return from(
			updateDoc(doc(this.firestore, "Shows", showTitle), {
				reviews: arrayUnion({
					comment: reviewData.comment,
					email: userEmail,
					rating: reviewData.rating
				})
			})
		);
	}

	public deleteReview(showTitle: string, reviewToDelete: Review): Observable<any> {
		return from(
			updateDoc(doc(this.firestore, "Shows", showTitle.replaceAll("_", " ")), {
				reviews: arrayRemove({
					comment: reviewToDelete.comment,
					email: reviewToDelete.email,
					rating: reviewToDelete.rating
				})
			})
		);
	}
}
