import { Injectable } from "@angular/core";

import { Firestore, getDocs, collection, QuerySnapshot, QueryDocumentSnapshot } from "@angular/fire/firestore";
import { BehaviorSubject, EMPTY, from, map, Observable, of } from "rxjs";
import { IShow } from "src/app/interfaces/show.interface";

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
			map((showsArray: Array<Show>) => {
				return showsArray.filter((show: Show) => {
					return show.rating !== null && show.rating >= 4;
				});
			})
		);
	}

	public getShowById(id: string): Observable<Show> {
		return this.getAllShows().pipe(
			map((showsArray: Array<Show>) => {
				return showsArray.filter((show: Show) => {
					return show.title === id.replaceAll("_", " ");
				})[0];
			})
		);
	}
}
