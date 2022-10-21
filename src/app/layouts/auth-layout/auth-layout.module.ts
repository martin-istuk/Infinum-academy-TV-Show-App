import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { RegisterModule } from "src/app/pages/register/register.module";
import { LoginModule } from "src/app/pages/login/login.module";
import { AuthLayoutComponent } from "./auth-layout.component";

@NgModule({
	declarations: [AuthLayoutComponent],
	imports: [CommonModule, LoginModule, RegisterModule, RouterModule],
	exports: [AuthLayoutComponent]
})
export class AuthLayoutModule {}
