import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { IShow } from 'src/app/interfaces/show.interface';
import { Show } from 'src/app/interfaces/show.model';

@Injectable({
	providedIn: 'root',
})
export class ShowService {
	constructor(private readonly http: HttpClient) {}

	// AuthInterceptor handles appending user uid, token etc. to every http request

	public getAllShows(): Observable<Array<Show>> {
		return this.http.get<{ shows: Array<IShow> }>('https://tv-shows.infinum.academy/shows').pipe(
			map((data) => {
				return data.shows.map((ishow) => new Show(ishow));
			}),
		);
	}

	public getTopRatedShows(): Observable<Array<Show>> {
		return this.http.get<{ shows: Array<IShow> }>('https://tv-shows.infinum.academy/shows/top_rated').pipe(
			map((data) => {
				return data.shows.map((ishow) => new Show(ishow));
			}),
		);
	}

	public getShowById(id: string): Observable<Show | undefined> {
		return this.http
			.get<{ show: IShow }>('https://tv-shows.infinum.academy/shows/' + id)
			.pipe(map((data) => new Show(data.show)));
	}
}
