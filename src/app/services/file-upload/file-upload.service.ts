import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EMPTY, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class FileUploadService {
	constructor(private readonly http: HttpClient) {}

	// AuthInterceptor handles appending user uid, token etc. to every http request

	public upload(file?: File): Observable<any> {
		if (file) {
			const formData = new FormData();
			formData.append('image', file);

			return this.http.put('https://tv-shows.infinum.academy/users', formData);
		}
		return EMPTY;
	}
}
