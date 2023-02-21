import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncuestaRoutingModule } from './encuesta-routing.module';
import { EncuestaPComponent } from './page/encuesta-p/encuesta-p.component';
import { AngularMaterialModule } from './../../angular-material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EncuestaPComponent
  ],
  imports: [
    CommonModule,
    EncuestaRoutingModule,
    AngularMaterialModule,
    FormsModule
  ]
})
export class EncuestaModule { }
