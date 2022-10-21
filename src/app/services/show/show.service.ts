import { Injectable } from "@angular/core";

import { Firestore, getDocs, collection, QuerySnapshot, QueryDocumentSnapshot } from "@angular/fire/firestore";
import { BehaviorSubject, from, map, Observable, tap } from "rxjs";

import { Show } from "src/app/interfaces/show.model";

@Injectable({ providedIn: "root" })
export class ShowService {
	constructor(private firestore: Firestore) {}

	private _shows$ = new BehaviorSubject<Array<Show>>([]);
	public shows$: Observable<Array<Show>> = this._shows$.asObservable();

	public topRatedShows$: Observable<Array<Show>> = this.shows$.pipe(
		map((showsArray: Array<Show>) => {
			return showsArray.filter((show: Show) => {
				show.rating !== null && show.rating >= 8;
			});
		})
	);

	public getAllShows(): void {
		from(getDocs(collection(this.firestore, "Shows"))).pipe(
			tap((querySnapshot: QuerySnapshot) => {
				const shows: Array<Show> = [];
				querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
					shows.push(doc.data() as Show);
				});
				this._shows$.next(shows);
			})
		);
	}
}
