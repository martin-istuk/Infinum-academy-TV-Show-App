import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { NavigationModule } from "src/app/pages/navigation/navigation.module";
import { AllShowsModule } from "src/app/pages/all-shows/all-shows.module";
import { MyProfileModule } from "src/app/pages/my-profile/my-profile.module";
import { ShowDetailsModule } from "src/app/pages/show-details/show-details.module";
import { TopRatedShowsModule } from "src/app/pages/top-rated-shows/top-rated-shows.module";
import { MainLayoutComponent } from "./main-layout.component";

@NgModule({
	declarations: [MainLayoutComponent],
	imports: [
		CommonModule,
		RouterModule,
		NavigationModule,
		AllShowsModule,
		TopRatedShowsModule,
		ShowDetailsModule,
		MyProfileModule,
		MatButtonModule,
		MatIconModule
	]
})
export class MainLayoutModule {}
