import { Component } from '@angular/core';

import { INavigationLink } from 'src/app/interfaces/navigation-link.interface';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
	constructor(public uiService: UiService) {}

	public navLinkToggle(): void {
		this.uiService.menuStatusSubject$.next(false);
	}

	public readonly navigationLinks: Array<INavigationLink> = [
		{
			url: '',
			title: 'All Shows',
		},
		{
			url: 'top-rated',
			title: 'Top Rated Shows',
		},
		{
			url: 'my-profile',
			title: 'My Profile',
		},
		{
			url: 'auth/login',
			title: 'Log out',
		},
	];
}
