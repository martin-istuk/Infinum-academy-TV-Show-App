import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MainLayoutModule } from './layouts/main-layout/main-layout.module';
import { NavigationModule } from './components/navigation/navigation.module';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { CustomTitleCaseModule } from './pipes/custom-title-case.module';

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
		CustomTitleCaseModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth()),
		provideDatabase(() => getDatabase()),
		provideFirestore(() => getFirestore()),
	],
	providers: [
		// {
		// 	provide: APP_INITIALIZER,
		// 	multi: true,
		// 	useFactory: (authService: AuthService) => {
		// 		return () => authService.init();
		// 	},
		// 	deps: [AuthService],
		// },
		// {
		// 	provide: HTTP_INTERCEPTORS,
		// 	multi: true,
		// 	useClass: AuthInterceptor,
		// },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
