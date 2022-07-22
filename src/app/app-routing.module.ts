import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AllShowsComponent } from './pages/all-shows/all-shows.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShowDetailsComponent } from './pages/show-details/show-details.component';
import { TopRatedShowsComponent } from './pages/top-rated-shows/top-rated-shows.component';

const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{ path: '', component: AllShowsComponent },
			{ path: 'top-rated', component: TopRatedShowsComponent },
			{ path: 'details/:id', component: ShowDetailsComponent },
		],
	},
	{
		path: 'auth',
		component: AuthLayoutComponent,
		children: [
			{ path: 'register', component: RegisterComponent },
			{ path: 'login', component: LoginComponent },
		],
	},
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
