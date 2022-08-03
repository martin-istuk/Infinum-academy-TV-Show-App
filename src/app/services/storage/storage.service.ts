import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	public loadLocalStorage<T>(key: string): T | null {
		const data: string | null = localStorage.getItem(key);

		if (!data) {
			return null;
		}

		return JSON.parse(data);
	}

	public saveToLocalStorage(key: string, data: string) {
		return localStorage.setItem(key, data);
	}
}
