import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule } from '@angular/router';
import { NavigationModule } from 'src/app/components/navigation/navigation.module';
import { AllShowsModule } from 'src/app/pages/all-shows/all-shows.module';
import { TopRatedShowsModule } from 'src/app/pages/top-rated-shows/top-rated-shows.module';
import { ShowDetailsModule } from 'src/app/pages/show-details/show-details.module';

@NgModule({
	declarations: [MainLayoutComponent],
	imports: [CommonModule, RouterModule, NavigationModule, AllShowsModule, TopRatedShowsModule, ShowDetailsModule],
})
export class MainLayoutModule {}
