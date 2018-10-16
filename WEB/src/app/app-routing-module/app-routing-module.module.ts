import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridComponent } from '../grid/grid.component';
import { TablaComponent } from '../tabla/tabla.component';
import { CursosComponent } from '../cursos/cursos.component';
import { InscCarreraComponent } from '../insc-carrera/insc-carrera.component';


const routes: Routes = [
  {path: 'cursos',component:CursosComponent},
  {path: 'grid', component:GridComponent},
  {path: 'tabla', component:TablaComponent},
  {path: 'inscCarrera', component:InscCarreraComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModuleModule { }
