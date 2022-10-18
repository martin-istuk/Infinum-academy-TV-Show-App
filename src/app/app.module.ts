import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getDatabase, provideDatabase } from "@angular/fire/database";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationModule } from "./components/navigation/navigation.module";
import { AuthLayoutModule } from "./layouts/auth-layout/auth-layout.module";
import { MainLayoutModule } from "./layouts/main-layout/main-layout.module";
import { CustomTitleCaseModule } from "./pipes/custom-title-case.module";

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
		provideFirestore(() => getFirestore())
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
	bootstrap: [AppComponent]
})
export class AppModule {}
