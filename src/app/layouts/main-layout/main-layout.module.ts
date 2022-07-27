import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { NavigationModule } from 'src/app/components/navigation/navigation.module';
import { AllShowsModule } from 'src/app/pages/all-shows/all-shows.module';
import { ShowFormModule } from 'src/app/pages/all-shows/show-form/show-form.module';
import { MyProfileModule } from 'src/app/pages/my-profile/my-profile.module';
import { ShowDetailsModule } from 'src/app/pages/show-details/show-details.module';
import { TopRatedShowsModule } from 'src/app/pages/top-rated-shows/top-rated-shows.module';
import { MainLayoutComponent } from './main-layout.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	declarations: [MainLayoutComponent],
	imports: [
		CommonModule,
		RouterModule,
		NavigationModule,
		AllShowsModule,
		TopRatedShowsModule,
		ShowDetailsModule,
		ShowFormModule,
		MyProfileModule,
		MatButtonModule,
		MatIconModule,
	],
})
export class MainLayoutModule {}
