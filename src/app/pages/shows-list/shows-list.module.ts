import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { ShowCardModule } from "./show-card/show-card.module";
import { ShowsListComponent } from "./shows-list.component";

@NgModule({
	declarations: [ShowsListComponent],
	imports: [CommonModule, RouterModule, ShowCardModule],
	exports: [ShowsListComponent]
})
export class ShowsListModule {}
