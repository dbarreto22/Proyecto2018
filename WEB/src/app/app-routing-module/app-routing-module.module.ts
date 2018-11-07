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
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { abmAsignaturaComponent } from '../abmasignatura/abmasignatura.component';
import { AsignarAsigCarreraComponent } from '../asignar-asig-carrera/asignar-asig-carrera.component';
import { ABMUsuarioComponent } from '../abmusuario/abmusuario.component';
import { ModificarUsuarioComponent } from '../modificar-usuario/modificar-usuario.component';
import { AsociarRolComponent } from '../asociar-rol/asociar-rol.component';
import { ModificarCarreraComponent } from '../modificar-carrera/modificar-carrera.component';
import { ABMCarreraComponent } from '../abmcarrera/abmcarrera.component';
import { ModificarAsignaturaComponent } from '../modificar-asignatura/modificar-asignatura.component';
import { CalificacionesCursoComponent } from '../calificaciones-curso/calificaciones-curso.component';
import { LoginLayoutComponent } from '../login/loginLayout';
import { HomeComponentComponent } from '../home-component/home-component.component';
import { HomeLayoutComponent } from '../layouts/home-layout/home-layout.component';


const routes: Routes = [
  /*{path: 'login',component:LoginComponent},                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  {path: 'inscCursos',component:CursosComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'grid', component:GridComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'tabla', component:TablaComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'inscCarrera', component:InscCarreraComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'inscExamen', component:InscExamenComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'calificaciones', component:CalificacionesComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'ingCarrera', component:IngrCarrerasComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'ingAsignatura', component:IngrAsignaturaComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'crearUsr', component:CrearUsuarioComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'grafo', component: GrafoComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'setingsAsignatura', component: abmAsignaturaComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'setingsUser', component: ABMUsuarioComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'asignarAsigCarrera', component: AsignarAsigCarreraComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'modificarUsr', component: ModificarUsuarioComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'asignarRol', component: AsociarRolComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'setingsCarrera', component: ABMCarreraComponent, canActivate: [ AuthorizatedGuard ]},
  {path: 'modificarCarrera', component: ModificarCarreraComponent, canActivate: [ AuthorizatedGuard ]},
 // { path: '', redirectTo: '/', pathMatch: 'full' },*/


 { path: '', component: HomeLayoutComponent, canActivate:[AuthorizatedGuard],
       children:[
      {path: 'grid', component:GridComponent},
      {path: 'tabla', component:TablaComponent},
      {path: 'inscCarrera', component:InscCarreraComponent},
      {path: 'inscExamen', component:InscExamenComponent},
      {path: 'calificaciones', component:CalificacionesComponent},
      {path: 'ingCarrera', component:IngrCarrerasComponent},
      {path: 'ingAsignatura', component:IngrAsignaturaComponent},
      {path: 'crearUsr', component:CrearUsuarioComponent},
      {path: 'grafo', component: GrafoComponent},
      {path: 'setingsAsignatura', component: abmAsignaturaComponent},
      {path: 'setingsUser', component: ABMUsuarioComponent},
      {path: 'asignarAsigCarrera', component: AsignarAsigCarreraComponent},
      {path: 'modificarUsr', component: ModificarUsuarioComponent},
      {path: 'asignarRol', component: AsociarRolComponent},
      {path: 'setingsCarrera', component: ABMCarreraComponent},
      {path: 'modificarCarrera', component: ModificarCarreraComponent},
      {path: 'modificarAsignatura', component: ModificarAsignaturaComponent},
      {path: 'calificacionesCurso', component: CalificacionesCursoComponent},
      {path: 'inscCursos', component: CursosComponent},
      {path: 'inscCursos', component: ABMCarreraComponent},
      
    ]},
  { path: '', component: LoginLayoutComponent,
       children:[{path:'login',component:LoginComponent}]},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModuleModule {
  
 }
