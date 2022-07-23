import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { UiService } from 'src/app/services/ui/ui.service';

@Component({
	selector: 'app-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
	constructor(public uiService: UiService) {}

	public menuOpened$: Observable<boolean> | null = this.uiService.menuStatusSubject$;

	public openMenu(): void {
		this.uiService.menuStatusSubject$.next(true);
	}
	public closeMenu(): void {
		this.uiService.menuStatusSubject$.next(false);
	}
}
