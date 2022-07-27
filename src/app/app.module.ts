import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MainLayoutModule } from './layouts/main-layout/main-layout.module';
import { NavigationModule } from './components/navigation/navigation.module';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		RouterModule,
		MainLayoutModule,
		AuthLayoutModule,
		NavigationModule,
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			multi: true,
			useFactory: (authService: AuthService) => {
				return () => {
					authService.init();
				};
			},
			deps: [AuthService],
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
