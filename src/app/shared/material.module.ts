import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const materialArray: Array<any> = [MatCardModule, MatIconModule, MatInputModule, MatButtonModule];

@NgModule({
	imports: materialArray,
	exports: materialArray,
})
export class MaterialModule {}
