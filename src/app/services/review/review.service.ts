import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map, switchMap } from 'rxjs';

import { IReview } from 'src/app/interfaces/review.interface';
import { Review } from 'src/app/interfaces/review.model';

@Injectable({
	providedIn: 'root',
})
export class ReviewService {
	constructor(private readonly http: HttpClient) {}

	public getReviewsByShowId(id: number): Observable<Array<Review> | undefined> {
		return this.http.get<{ reviews: Array<IReview> }>('https://tv-shows.infinum.academy/shows/' + id + '/reviews').pipe(
			map((data) => {
				return data.reviews.map((ireview) => {
					return new Review(ireview);
				});
			}),
		);
	}

	public addNewReview(showId: number, comment: string, rating: number): Observable<Array<Review> | undefined> {
		const reviewData = {
			show_id: showId,
			comment: comment,
			rating: rating,
		};
		return this.http.post<{ review: IReview }>('https://tv-shows.infinum.academy/reviews', reviewData).pipe(
			switchMap(() => {
				return this.getReviewsByShowId(showId);
			}),
		);
	}
}
