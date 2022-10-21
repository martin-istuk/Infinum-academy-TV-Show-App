import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";

import { NavigationComponent } from "./navigation.component";

@NgModule({
	declarations: [NavigationComponent],
	imports: [CommonModule, MatButtonModule, RouterModule],
	exports: [NavigationComponent]
})
export class NavigationModule {}
