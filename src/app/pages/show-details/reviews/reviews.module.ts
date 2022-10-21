import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { RatingModule } from "../../shows-list/show-card/rating/rating.module";
import { ReviewsComponent } from "./reviews.component";

@NgModule({
	declarations: [ReviewsComponent],
	imports: [CommonModule, MatCardModule, RatingModule, MatButtonModule, MatIconModule],
	exports: [ReviewsComponent]
})
export class ReviewsModule {}
