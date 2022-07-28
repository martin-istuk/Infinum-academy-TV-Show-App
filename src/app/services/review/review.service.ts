import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

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

	// public addNewReview(showId: string, comment: string, rating: number): void {
	// 	const newReviewId = String(this.reviews.length);
	// 	console.log('-------------------------------');
	// 	console.log('ID: ' + newReviewId);
	// 	console.log('Show ID: ' + showId);
	// 	console.log('Comment: ' + comment);
	// 	console.log('Rating: ' + rating);
	// 	console.log('-------------------------------');
	// }
}
