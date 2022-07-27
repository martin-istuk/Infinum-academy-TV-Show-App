import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UiService {
	public menuStatusSubject$ = new BehaviorSubject<boolean>(false);
}
