import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { RatingModule } from "./rating/rating.module";
import { ShowCardComponent } from "./show-card.component";

@NgModule({
	declarations: [ShowCardComponent],
	imports: [CommonModule, MatCardModule, RatingModule, MatIconModule],
	exports: [ShowCardComponent]
})
export class ShowCardModule {}
