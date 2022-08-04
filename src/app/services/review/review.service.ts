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

	public getReviewsByShowId(id: string): Observable<Array<Review> | undefined> {
		return this.http.get<{ reviews: Array<IReview> }>('https://tv-shows.infinum.academy/shows/' + id + '/reviews').pipe(
			map((data) => {
				return data.reviews.map((ireview) => {
					return new Review(ireview);
				});
			}),
		);
	}

	public addNewReview(reviewData: IReview): Observable<IReview> {
		return this.http.post<IReview>('https://tv-shows.infinum.academy/reviews', reviewData);
	}

	public deleteReview(review: Review): Observable<string> {
		return this.http.delete<string>('https://tv-shows.infinum.academy/reviews/' + review.id);
	}
}
