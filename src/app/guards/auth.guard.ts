import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

import { Observable, map } from "rxjs";

import { AuthService } from "../services/auth/auth.service";
import { User } from "../interfaces/user.model";

@Injectable({
	providedIn: "root"
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.authService.user$.pipe(
			map((user: User | null) => {
				if (user !== null) {
					return true;
				}
				return this.router.createUrlTree(["auth", "login"], { relativeTo: null });
			})
		);
	}
}
