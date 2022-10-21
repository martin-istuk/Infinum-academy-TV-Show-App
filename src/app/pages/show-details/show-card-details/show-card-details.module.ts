import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { RatingModule } from "../../shows-list/show-card/rating/rating.module";
import { CustomTitleCaseModule } from "src/app/pipes/custom-title-case.module";
import { ShowCardDetailsComponent } from "./show-card-details.component";

@NgModule({
	declarations: [ShowCardDetailsComponent],
	imports: [CommonModule, MatCardModule, RatingModule, MatIconModule, CustomTitleCaseModule],
	exports: [ShowCardDetailsComponent]
})
export class ShowCardDetailsModule {}
