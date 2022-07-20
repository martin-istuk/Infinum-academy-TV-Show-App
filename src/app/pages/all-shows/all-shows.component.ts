import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { Observable, tap, catchError, EMPTY, BehaviorSubject, switchMap } from 'rxjs';

import { Show } from 'src/app/interfaces/show.model';
import { ShowService } from 'src/app/services/show/show.service';

@Component({
	selector: 'app-all-shows',
	templateUrl: './all-shows.component.html',
	styleUrls: ['./all-shows.component.scss'],
})
export class AllShowsComponent {
	constructor(private showService: ShowService) {}

	public loadingInProgress: boolean = true;
	public errorOnGetShows: boolean = false;

	private trigger$ = new BehaviorSubject(undefined);

	public shows$ = this.trigger$.asObservable().pipe(
		tap(() => {
			this.loadingInProgress = true;
			this.errorOnGetShows = false;
		}),
		switchMap(() => {
			return this.showService.getAllShows().pipe(
				tap(() => {
					this.loadingInProgress = false;
					this.errorOnGetShows = false;
				}),
				catchError(() => {
					this.loadingInProgress = false;
					this.errorOnGetShows = true;
					return EMPTY;
				}),
			);
		}),
	);

	public onRetryClick() {
		this.trigger$.next(undefined);
	}
}
