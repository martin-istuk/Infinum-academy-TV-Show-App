import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';
import { AllShowsModule } from 'src/app/pages/all-shows/all-shows.module';
import { TopRatedShowsModule } from 'src/app/pages/top-rated-shows/top-rated-shows.module';
import { ShowDetailsModule } from 'src/app/pages/show-details/show-details.module';
import { ShowFormModule } from 'src/app/pages/all-shows/show-form/show-form.module';
import { NavigationModule } from 'src/app/components/navigation/navigation.module';
import { LoginModule } from 'src/app/pages/login/login.module';
import { RegisterModule } from 'src/app/pages/register/register.module';

@NgModule({
	declarations: [MainLayoutComponent],
	imports: [
		CommonModule,
		RouterModule,
		LoginModule,
		RegisterModule,
		NavigationModule,
		AllShowsModule,
		TopRatedShowsModule,
		ShowDetailsModule,
		ShowFormModule,
	],
})
export class MainLayoutModule {}
