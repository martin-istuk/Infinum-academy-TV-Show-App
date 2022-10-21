import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { ShowCardModule } from "../shows-list/show-card/show-card.module";
import { ShowsListModule } from "../shows-list/shows-list.module";
import { TopRatedShowsComponent } from "./top-rated-shows.component";

@NgModule({
	declarations: [TopRatedShowsComponent],
	imports: [CommonModule, ShowsListModule, MatButtonModule, ShowCardModule, MatProgressSpinnerModule],
	exports: [TopRatedShowsComponent]
})
export class TopRatedShowsModule {}
