import { Component, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";

@Component({
	selector: "app-main-layout",
	templateUrl: "./main-layout.component.html",
	styleUrls: ["./main-layout.component.scss"]
})
export class MainLayoutComponent implements OnDestroy {
	public mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;

	constructor(media: MediaMatcher, changeDetectorRef: ChangeDetectorRef) {
		this.mobileQuery = media.matchMedia("(max-width: 1060px)");
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}
}
