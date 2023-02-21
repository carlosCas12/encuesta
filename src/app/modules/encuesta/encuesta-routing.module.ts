import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaPComponent } from './page/encuesta-p/encuesta-p.component';

const routes: Routes = [
  {path: '', component: EncuestaPComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestaRoutingModule { }
