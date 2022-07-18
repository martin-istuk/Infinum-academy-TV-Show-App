import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable } from 'rxjs';

import { IShow } from 'src/app/interfaces/show.interface';
import { Show } from 'src/app/interfaces/show.model';
import { StorageService } from '../storage/storage.service';

const SHOW_KEY = 'myShows';

@Injectable({
	providedIn: 'root',
})
export class ShowService {
	constructor(private readonly storageService: StorageService) {}

	private shows: Array<Show> = [
		{
			id: 1,
			title: 'The Lord of the Rings: The Fellowship of the Ring',
			description:
				'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
			average_rating: 8,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_FMjpg_UY474_.jpg%20319w',
			reviews: [
				{
					id: 0,
					comment: 'Frodo rulez.',
					rating: 9,
				},
			],
		},
		{
			id: 2,
			title: 'The Lord of the Rings: The Two Towers',
			description:
				"While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
			average_rating: 0,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UY497_.jpg',
			reviews: [
				{
					id: 0,
					comment: 'Gollum rulez.',
					rating: 10,
				},
				{
					id: 1,
					comment: 'Gimli rulez.',
					rating: 9,
				},
			],
		},
		{
			id: 3,
			title: 'The Lord of the Rings: The Return of the King',
			description:
				"Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
			average_rating: 9.9,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UY474_.jpg',
			reviews: [
				{
					id: 0,
					comment: 'Galadriel rulez.',
					rating: 10,
				},
				{
					id: 1,
					comment: 'Aragorn rulez.',
					rating: 9,
				},
				{
					id: 2,
					comment: 'Gandalf rulez.',
					rating: 8,
				},
			],
		},
		{
			id: 4,
			title: 'Star Wars: Episode I - The Phantom Menace',
			description:
				'Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their original glory.',
			average_rating: 6.5,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BMjA2NzQ3NjE4M15BMl5BanBnXkFtZTgwNTE5OTcyNDM@._V1_FMjpg_UY469_.jpg',
			reviews: [],
		},
		{
			id: 5,
			title: 'Star Wars: Episode II - Attack of the Clones',
			description:
				'Ten years after initially meeting, Anakin Skywalker shares a forbidden romance with Padmé Amidala, while Obi-Wan Kenobi investigates an assassination attempt on the senator and discovers a secret clone army crafted for the Jedi.',
			average_rating: 6.6,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_FMjpg_UY484_.jpg',
			reviews: [],
		},
		{
			id: 6,
			title: 'Star Wars: Episode III - Revenge of the Sith',
			description:
				'Three years into the Clone Wars, the Jedi rescue Palpatine from Count Dooku. As Obi-Wan pursues a new threat, Anakin acts as a double agent between the Jedi Council and Palpatine and is lured into a sinister plan to rule the galaxy.',
			average_rating: 7.6,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_FMjpg_UY426_.jpg',
			reviews: [],
		},
		{
			id: 7,
			title: 'Star Wars: Episode IV',
			description:
				"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
			average_rating: 8.6,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BNzg4MjQxNTQtZmI5My00YjMwLWJlMjUtMmJlY2U2ZWFlNzY1XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UY478_.jpg',
			reviews: [],
		},
		{
			id: 8,
			title: 'Star Wars: Episode V - The Empire Strikes Back',
			description:
				'After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.',
			average_rating: 8.7,
			image_url:
				'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UY498_.jpg',
			reviews: [],
		},
		{
			id: 9,
			title: 'Star Wars: Episode VI - Return of the Jedi',
			description:
				"After a daring mission to rescue Han Solo from Jabba the Hutt, the Rebels dispatch to Endor to destroy the second Death Star. Meanwhile, Luke struggles to help Darth Vader back from the dark side without falling into the Emperor's trap.",
			average_rating: 0,
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

	private readonly shows$ = this.createShowsBehaviorSubject();

	public getAllShows(): Observable<Array<Show>> {
		this.storageService.saveToLocalStorage(SHOW_KEY, this.shows$.value);
		return this.shows$.asObservable().pipe(delay(this.randomNumber));
	}

	public getTopRatedShows(): Observable<Array<Show>> {
		return this.shows$
			.pipe(
				map((shows) => {
					return shows.filter((show: Show) => {
						return show.averageRating !== null && show.averageRating >= 8.6;
					});
				}),
			)
			.pipe(delay(this.randomNumber));
	}

	public addNewShow(title: string, description: string): void {
		if (title && description) {
			const currentShows = this.shows$.getValue();
			currentShows.push(
				new Show({
					id: this.shows.length + 1,
					title: title,
					description: description,
					average_rating: null,
					image_url: null,
					reviews: [],
				}),
			);
			this.shows$.next(currentShows);
			this.storageService.saveToLocalStorage(SHOW_KEY, currentShows);
		}
	}

	public readonly randomNumber: number = 1000 * (1 + Math.random());
}
