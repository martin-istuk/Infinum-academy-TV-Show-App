import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatIconModule } from "@angular/material/icon";

import { RatingComponent } from "./rating.component";

@NgModule({
	declarations: [RatingComponent],
	imports: [CommonModule, MatIconModule],
	exports: [RatingComponent]
})
export class RatingModule {}
