import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [NavigationComponent],
	imports: [CommonModule, MatButtonModule, RouterModule],
	exports: [NavigationComponent],
})
export class NavigationModule {}
