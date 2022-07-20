import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MainLayoutModule } from './layouts/main-layout/main-layout.module';
import { NavigationModule } from './components/navigation/navigation.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		RouterModule,
		MainLayoutModule,
		NavigationModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
