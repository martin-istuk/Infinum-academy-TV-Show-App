import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (localStorage.getItem('access-token') === null) {
			return next.handle(request);
		}

		const uid = localStorage.getItem('uid');
		const accessToken = localStorage.getItem('access-token');
		const client = localStorage.getItem('client');

		const modifiedRequest = request.clone({
			headers: request.headers
				.set('uid', uid as string)
				.set('access-token', accessToken as string)
				.set('client', client as string),
		});

		return next.handle(modifiedRequest);
	}
}
