import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { INavigationLink } from 'src/app/interfaces/navigation-link.interface';
import { User } from 'src/app/interfaces/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
	constructor(private authService: AuthService, private uiService: UiService) {}

	public navLinkToggle(): void {
		this.uiService.menuStatusSubject$.next(false);
	}

	public logout(): void {
		this.authService.logoutUser();
	}

	public readonly navigationLinks: Array<INavigationLink> = [
		{
			url: '',
			title: 'All Shows',
		},
		{
			url: 'top-rated',
			title: 'Top Rated',
		},
		{
			url: 'my-profile',
			title: 'My Profile',
		},
	];
}
