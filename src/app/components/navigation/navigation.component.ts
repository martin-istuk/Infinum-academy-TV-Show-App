import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { INavigationLink } from "src/app/interfaces/navigation-link.interface";
import { AuthService } from "src/app/services/auth/auth.service";
import { UiService } from "src/app/services/ui/ui.service";

@Component({
	selector: "app-navigation",
	templateUrl: "./navigation.component.html",
	styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnDestroy {
	constructor(private authService: AuthService, private uiService: UiService, private router: Router) {}

	private subscription?: Subscription;

	public readonly navigationLinks: Array<INavigationLink> = [
		{
			url: "",
			title: "All Shows"
		},
		{
			url: "top-rated",
			title: "Top Rated"
		},
		{
			url: "my-profile",
			title: "My Profile"
		}
	];

	public navLinkToggle(): void {
		this.uiService.menuStatusSubject$.next(false);
	}

	public logout(): void {
		this.subscription = this.authService.logoutUser().subscribe({
			next: () => this.router.navigate([""]),
			error: (error) => window.alert(error)
		});
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}
}
