import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, map, tap, Observable } from 'rxjs';

import { IShow } from 'src/app/interfaces/show.interface';
import { Show } from 'src/app/interfaces/show.model';

// const SHOW_KEY = 'myShows';

@Injectable({
	providedIn: 'root',
})
export class ShowService {
	constructor(private readonly http: HttpClient) {}

	private shows: Array<Show> = [
		{
			id: '0',
			title: 'Game of Thrones',
			description:
				'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
			average_rating: 4.2,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BNTY3ZDZiNGItOGQwMi00MTEzLTg1YzYtODE3OGUxMTg5MjA4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UY711_.jpg',
		},
		{
			id: '1',
			title: 'Chernobyl',
			description:
				"In April 1986, an explosion at the Chernobyl nuclear power plant in the Union of Soviet Socialist Republics becomes one of the world's worst man-made catastrophes.",
			average_rating: 4.7,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BMmI2OTMxZTUtMTM5OS00MGNiLWFhNGMtYzJiODUwYjRmODA5XkEyXkFqcGdeQXVyMTM0NTc2NDgw._V1_.jpg',
		},
		{
			id: '2',
			title: 'The Mandalorian',
			description:
				'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
			average_rating: 4.6,
			image_url: 'https://lumiere-a.akamaihd.net/v1/images/p_fyc_themandalorian_19097_de619ea9.jpeg',
		},
		{
			id: '3',
			title: 'Vikings',
			description:
				'Vikings transports us to the brutal and mysterious world of Ragnar Lothbrok, a Viking warrior and farmer who yearns to explore--and raid--the distant shores across the ocean.',
			average_rating: 4.0,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BODk4ZjU0NDUtYjdlOS00OTljLTgwZTUtYjkyZjk1NzExZGIzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
		},
		{
			id: '4',
			title: 'Stranger Things',
			description:
				'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
			average_rating: 3.1,
			image_url: 'https://m.media-amazon.com/images/I/81la9iMuIiL._AC_SY679_.jpg',
		},
		{
			id: '5',
			title: 'Modern Family',
			description:
				'Three different but related families face trials and tribulations in their own uniquely comedic ways.',
			average_rating: 2.9,
			image_url:
				'https://cdn1.edgedatg.com/aws/v2/abc/ModernFamily/showimages/63c138af2d70973bf297ae3e1f97712b/588x783-Q80_63c138af2d70973bf297ae3e1f97712b.jpg',
		},
		{
			id: '6',
			title: 'MythBusters',
			description:
				'A weekly documentary in which two Hollywood special effects experts attempt to debunk urban legends by directly testing them.',
			average_rating: 4.0,
			image_url: 'https://d30a6s96kk7rhm.cloudfront.net/original/readings/931/850/005/9318500051288.jpg',
		},
		{
			id: '7',
			title: 'House of Cards',
			description:
				'A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.',
			average_rating: 4.1,
			image_url:
				'https://i.pinimg.com/736x/5b/14/dc/5b14dcc90ede2f37c33854442274570b--house-of-cards-guilty-pleasure.jpg',
		},
		{
			id: '8',
			title: 'Planet Earth',
			description:
				'Emmy Award-winning, 11 episodes, five years in the making, the most expensive nature documentary series ever commissioned by the BBC, and the first to be filmed in high definition.',
			average_rating: 5,
			image_url: 'https://flxt.tmsimg.com/assets/p8431669_b_v8_aa.jpg',
		},
		{
			id: '9',
			title: 'Planet Earth II',
			description:
				'David Attenborough returns with a new wildlife documentary that shows life in a variety of habitats.',
			average_rating: 4.4,
			image_url: 'https://www.themoviedb.org/t/p/w500/tUKomxy50suT4MyxjYfOJDkZUq3.jpg',
		},
		{
			id: '10',
			title: 'The Blue Planet',
			description:
				'Mammoth series, five years in the making, taking a look at the rich tapestry of life in the worlds oceans.',
			average_rating: 4.9,
			image_url: 'https://www.themoviedb.org/t/p/original/n6Nj3WMrwFdA5x6FasE4vLCoQAs.jpg',
		},
		{
			id: '11',
			title: 'Blue Planet II',
			description:
				'David Attenborough returns to the worlds oceans in this sequel to the acclaimed documentary filming rare and unusual creatures of the deep, as well as documenting the problems our oceans face.',
			average_rating: 4.4,
			image_url: 'https://m.media-amazon.com/images/I/81HgqrFSmqL._SY550_.jpg',
		},
	].map((ishow: IShow) => {
		return new Show(ishow);
	});

	private createShowsBehaviorSubject(): BehaviorSubject<Array<Show>> {
		return new BehaviorSubject<Array<Show>>(this.shows);
	}

	private shows$ = this.createShowsBehaviorSubject();

	public getAllShows(): Observable<Array<Show>> {
		return this.http.get<{ shows: Array<IShow> }>('https://tv-shows.infinum.academy/shows').pipe(
			map((show) => {
				return show.shows.map((ishow) => {
					return new Show(ishow);
				});
			}),
		);
	}

	public getTopRatedShows(): Observable<Array<Show>> {
		return this.http.get<{ shows: Array<IShow> }>('https://tv-shows.infinum.academy/shows/top_rated').pipe(
			map((show) => {
				return show.shows.map((ishow) => {
					return new Show(ishow);
				});
			}),
		);
	}

	public getShowById(id: string): Observable<Show | undefined> {
		return this.http.get<IShow>('https://tv-shows.infinum.academy/shows/' + id).pipe(
			map((ishow) => {
				return new Show(ishow);
			}),
		);
	}

	public addNewShow(title: string, description: string): void {
		if (title && description) {
			const currentShows = this.shows$.getValue();
			currentShows.push(
				new Show({
					id: (this.shows.length + 1).toString(),
					title: title,
					description: description,
					average_rating: null,
					image_url: null,
				}),
			);
			this.shows$.next(currentShows);
			// this.storageService.saveToLocalStorage(SHOW_KEY, currentShows);
		}
	}

	// private readonly delayFactor: number = 1000 * (0.5 + Math.random());

	// private readonly errorFactor: number = 0.1;
}
