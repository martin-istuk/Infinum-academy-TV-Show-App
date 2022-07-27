import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const accessToken = localStorage.getItem('access-token');
		const client = localStorage.getItem('client');
		const uid = localStorage.getItem('uid');

		const modifiedRequest = request.clone({
			headers: request.headers
				.append('access-token', accessToken as string)
				.append('client', client as string)
				.append('uid', uid as string),
		});

		return next.handle(modifiedRequest);
	}
}
