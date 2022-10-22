import { Component, Output, EventEmitter } from "@angular/core";

import { INavigationLink } from "src/app/interfaces/navigation-link.interface";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
	selector: "app-navigation",
	templateUrl: "./navigation.component.html",
	styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent {
	constructor(private authService: AuthService) {}

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

	@Output() toggleMobileMenu = new EventEmitter<boolean>();

	public navLinkToggle(): void {
		this.toggleMobileMenu.emit(true);
	}

	public logout(): void {
		this.authService.logoutUser();
	}
}
