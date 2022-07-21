import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of, tap } from 'rxjs';

import { IShow } from 'src/app/interfaces/show.interface';
import { Show } from 'src/app/interfaces/show.model';
import { StorageService } from '../storage/storage.service';

const SHOW_KEY = 'myShows';

@Injectable({
	providedIn: 'root',
})
export class ShowService {
	constructor(private storageService: StorageService) {}

	private shows: Array<Show> = [
		{
			id: '0',
			title: 'The Lord of the Rings: The Fellowship of the Ring',
			description:
				'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
			average_rating: 4.6,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_FMjpg_UY474_.jpg%20319w',
			reviews: [],
		},
		{
			id: '1',
			title: 'The Lord of the Rings: The Two Towers',
			description:
				"While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
			average_rating: 0,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UY497_.jpg',
			reviews: [
				{
					id: '0',
					comment:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac lectus hendrerit, tristique massa nec, iaculis turpis. Ut id diam non arcu molestie facilisis quis at tellus. Vestibulum ante ipsum..',
					rating: 5,
				},
				{
					id: '1',
					comment:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac lectus hendrerit, tristique massa nec, iaculis turpis. Ut id diam non arcu molestie facilisis quis at tellus. Vestibulum ante ipsum..',
					rating: 3,
				},
			],
		},
		{
			id: '2',
			title: 'The Lord of the Rings: The Return of the King',
			description:
				"Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
			average_rating: 5,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UY474_.jpg',
			reviews: [
				{
					id: '0',
					comment:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac lectus hendrerit, tristique massa nec, iaculis turpis. Ut id diam non arcu molestie facilisis quis at tellus. Vestibulum ante ipsum..',
					rating: 5,
				},
				{
					id: '1',
					comment:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac lectus hendrerit, tristique massa nec, iaculis turpis. Ut id diam non arcu molestie facilisis quis at tellus. Vestibulum ante ipsum..',
					rating: 4,
				},
				{
					id: '2',
					comment:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac lectus hendrerit, tristique massa nec, iaculis turpis. Ut id diam non arcu molestie facilisis quis at tellus. Vestibulum ante ipsum..',
					rating: 3,
				},
			],
		},
		{
			id: '3',
			title: 'Star Wars: Episode I - The Phantom Menace',
			description:
				'Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their original glory.',
			average_rating: 2.9,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BMjA2NzQ3NjE4M15BMl5BanBnXkFtZTgwNTE5OTcyNDM@._V1_FMjpg_UY469_.jpg',
			reviews: [],
		},
		{
			id: '4',
			title: 'Star Wars: Episode II - Attack of the Clones',
			description:
				'Ten years after initially meeting, Anakin Skywalker shares a forbidden romance with Padmé Amidala, while Obi-Wan Kenobi investigates an assassination attempt on the senator and discovers a secret clone army crafted for the Jedi.',
			average_rating: 3.1,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_FMjpg_UY484_.jpg',
			reviews: [],
		},
		{
			id: '5',
			title: 'Star Wars: Episode III - Revenge of the Sith',
			description:
				'Three years into the Clone Wars, the Jedi rescue Palpatine from Count Dooku. As Obi-Wan pursues a new threat, Anakin acts as a double agent between the Jedi Council and Palpatine and is lured into a sinister plan to rule the galaxy.',
			average_rating: 2.9,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_FMjpg_UY426_.jpg',
			reviews: [],
		},
		{
			id: '6',
			title: 'Star Wars: Episode IV',
			description:
				"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
			average_rating: 4.1,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BNzg4MjQxNTQtZmI5My00YjMwLWJlMjUtMmJlY2U2ZWFlNzY1XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UY478_.jpg',
			reviews: [],
		},
		{
			id: '7',
			title: 'Star Wars: Episode V - The Empire Strikes Back',
			description:
				'After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.',
			average_rating: 4.5,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UY498_.jpg',
			reviews: [],
		},
		{
			id: '8',
			title: 'Star Wars: Episode VI - Return of the Jedi',
			description:
				"After a daring mission to rescue Han Solo from Jabba the Hutt, the Rebels dispatch to Endor to destroy the second Death Star. Meanwhile, Luke struggles to help Darth Vader back from the dark side without falling into the Emperor's trap.",
			average_rating: 3.8,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_FMjpg_UY496_.jpg',
			reviews: [],
		},
	].map((show: IShow) => {
		return new Show(show);
	});

	private createShowsBehaviorSubject(): BehaviorSubject<Array<Show>> {
		return new BehaviorSubject<Array<Show>>(this.storageService.loadLocalStorage<Array<Show>>(SHOW_KEY) || this.shows);
	}

	private shows$ = this.createShowsBehaviorSubject();

	public getAllShows(): Observable<Array<Show>> {
		// this.storageService.saveToLocalStorage(SHOW_KEY, this.shows$.value);

		if (Math.random() > this.errorFactor) {
			// NO ERROR
			return this.shows$.pipe(delay(this.delayFactor));
		} else {
			// SIMULATE ERROR
			return this.shows$.pipe(
				delay(this.delayFactor),
				tap(() => {
					throw new Error('Error getting shows data.');
				}),
			);
		}
	}

	public getTopRatedShows(): Observable<Array<Show>> {
		if (Math.random() > this.errorFactor) {
			// NO ERROR
			return this.shows$.pipe(
				map((shows) => {
					return shows.filter((show: Show) => {
						return show.averageRating !== null && show.averageRating >= 4.5;
					});
				}),
				delay(this.delayFactor),
			);
		} else {
			// SIMULATE ERROR
			return this.shows$.pipe(
				delay(this.delayFactor),
				tap(() => {
					throw new Error('Error getting shows data.');
				}),
			);
		}
	}

	public getShowById(id: string): Observable<Show | undefined> {
		return of(this.shows).pipe(
			map((shows) => {
				return shows.find((show) => {
					return show.id === id;
				});
			}),
			delay(this.delayFactor),
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
					reviews: [],
				}),
			);
			this.shows$.next(currentShows);
			// this.storageService.saveToLocalStorage(SHOW_KEY, currentShows);
		}
	}

	private readonly delayFactor: number = 1000 * (0.5 + Math.random());

	private readonly errorFactor: number = 0.1;
}
