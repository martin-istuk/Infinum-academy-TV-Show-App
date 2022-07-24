import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { Review } from 'src/app/interfaces/review.model';
import { IReview } from 'src/app/interfaces/review.interface';

@Injectable({
	providedIn: 'root',
})
export class ReviewService {
	private reviews: Array<Review> = [
		{
			id: '0',
			showId: '0',
			comment: 'Aaaaaaa.',
			rating: 4,
		},
		{
			id: '1',
			showId: '0',
			comment: 'Bbbbbbb.',
			rating: 5,
		},
		{
			id: '2',
			showId: '1',
			comment: 'Ccccccc.',
			rating: 4,
		},
		{
			id: '3',
			showId: '1',
			comment: 'Dddddd.',
			rating: 2,
		},
		{
			id: '4',
			showId: '1',
			comment: 'FFFFFF.',
			rating: 5,
		},
		{
			id: '5',
			showId: '2',
			comment: 'I am a Review.',
			rating: 3,
		},
		{
			id: '6',
			showId: '3',
			comment: 'I am a Review.',
			rating: 3,
		},
		{
			id: '7',
			showId: '3',
			comment: 'I am a Review.',
			rating: 2,
		},
		{
			id: '7',
			showId: '3',
			comment: 'I am a Review.',
			rating: 5,
		},
	].map((review: IReview) => {
		return new Review(review);
	});

	public getReviewsByShowId(showId: string): Observable<Array<Review>> {
		return of(this.reviews).pipe(
			map((reviews) => {
				return reviews.filter((review) => {
					return review.showId === showId;
				});
			}),
		);
	}

	public addNewReview(showId: string, comment: string, rating: number): void {
		const newReviewId = String(this.reviews.length);
		console.log('-------------------------------');
		console.log('ID: ' + newReviewId);
		console.log('Show ID: ' + showId);
		console.log('Comment: ' + comment);
		console.log('Rating: ' + rating);
		console.log('-------------------------------');
	}

	private readonly delayFactor: number = 1000 * (0.5 + Math.random());
}
