import { Component, Input } from "@angular/core";

@Component({
	selector: "app-rating",
	templateUrl: "./rating.component.html",
	styleUrls: ["./rating.component.scss"]
})
export class RatingComponent {
	@Input() rating: number | null = 0;

	public get filledStar() {
		return Math.round(Number(this.rating));
	}

	public get outlinedStar() {
		return 5 - Math.round(Number(this.rating));
	}
}
