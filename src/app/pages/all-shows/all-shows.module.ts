import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { ShowsListModule } from "src/app/components/shows-list/shows-list.module";
import { ShowFormModule } from "./show-form/show-form.module";
import { AllShowsComponent } from "./all-shows.component";

@NgModule({
	declarations: [AllShowsComponent],
	imports: [CommonModule, ShowsListModule, ShowFormModule, MatProgressSpinnerModule, MatButtonModule],
	exports: [AllShowsComponent]
})
export class AllShowsModule {}
