import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'encuesta',
    loadChildren: () => import('./modules/encuesta/encuesta.module').then(m => m.EncuestaModule)
  },
  {
    path:'**',
    redirectTo: 'encuesta'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
