import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowsContainerComponent } from './shows-container/shows-container.component';
import { ShowsListComponent } from './shows-container/shows-list/shows-list.component';
import { ShowFormComponent } from './shows-container/show-form/show-form.component';
import { ShowCardComponent } from './shows-container/shows-list/show-card/show-card.component';
import { RatingComponent } from './shows-container/shows-list/show-card/rating/rating.component';
import { MaterialModule } from './shared/material.module';

@NgModule({
	declarations: [
		AppComponent,
		ShowsContainerComponent,
		ShowsListComponent,
		ShowFormComponent,
		ShowCardComponent,
		RatingComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
