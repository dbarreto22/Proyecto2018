import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridComponent } from '../grid/grid.component';
import { TablaComponent } from '../tabla/tabla.component';
import { CursosComponent } from '../cursos/cursos.component';
import { InscCarreraComponent } from '../insc-carrera/insc-carrera.component';
import {LoginComponent} from '../login/login.component';
import {AuthorizatedGuard} from "../authorizated.guard";
import { GrafoComponent } from '../grafo/grafo/grafo.component';
import { InscExamenComponent } from '../insc-examen/insc-examen.component';
import { CalificacionesComponent } from '../calificaciones/calificaciones.component';
import { IngrCarrerasComponent } from '../ingr-carreras/ingr-carreras.component';
import { IngrAsignaturaComponent } from '../ingr-asignatura/ingr-asignatura.component';


const routes: Routes = [
  {path: 'login',component:LoginComponent},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  {path: 'inscCursos',component:CursosComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'grid', component:GridComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'tabla', component:TablaComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'inscCarrera', component:InscCarreraComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'inscExamen', component:InscExamenComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'calificaciones', component:CalificacionesComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'ingCarrera', component:IngrCarrerasComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'ingAsignatura', component:IngrAsignaturaComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'grafo', component: GrafoComponent, canActivate: [ AuthorizatedGuard ]},
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModuleModule {
  
 }
