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
import { ErrorComponent } from '../error.component';
import { ListarUsuariosComponent } from '../listar-usuarios/listar-usuarios.component';
import { ListarCursosCarrerasComponent } from '../listar-cursos-carreras/listar-cursos-carreras.component';
import { ListarCarrerasComponent } from '../listar-carreras/listar-carreras.component';


const routes: Routes = [
 { path: '', component: HomeLayoutComponent, canActivate:[AuthorizatedGuard],
       children:[
      {path: 'grid', component:GridComponent},
      {path: 'tabla', component:TablaComponent},
      {path: 'inscCarrera', component:InscCarreraComponent},
      {path: 'inscExamen', component:InscExamenComponent},
      {path: 'listarCarreras', component:ListarCarrerasComponent},
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
      {path: 'listarUsuarios', component: ListarUsuariosComponent},
      {path: 'listarCursos', component: ListarCursosCarrerasComponent},
      {path: 'calificaciones', component: CalificacionesComponent},
     // {path: '', component: CalificacionesCursoComponent},
      
    ]},
  { path: '', component: LoginLayoutComponent,
       children:[{path:'login',component:LoginComponent}]},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModuleModule {
  
 }
