import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule,
   MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule,
    MatTableModule, MatPaginatorModule, MatSortModule,MatInputModule} from '@angular/material';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar-Alumno/toolbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { GridComponent } from './grid/grid.component';
import { TablaComponent } from './tabla/tabla.component';
import { CursosComponent } from './cursos/cursos.component';
import {RouterModule} from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModuleModule } from './app-routing-module/app-routing-module.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToolbarAdministradorComponent } from './toolbar-administrador/toolbar-administrador.component';
import { ToolbarDirectorComponent } from './toolbar-director/toolbar-director.component';
import { InscCarreraComponent } from './insc-carrera/insc-carrera.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import {ApiService} from '../app/api.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';
import {AuthorizatedGuard} from './authorizated.guard';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import * as d3 from 'd3';
import { D3Service, D3_DIRECTIVES } from './d3';
import { GraphComponent } from './visuals/graph/graph.component';
import { SHARED_VISUALS } from './visuals/shared';
import { GrafoComponent } from './grafo/grafo/grafo.component';
import { StorageServiceModule } from 'angular-webstorage-service';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}





@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    GridComponent,
    TablaComponent,
    CursosComponent,
    ToolbarAdministradorComponent,
    ToolbarDirectorComponent,
    InscCarreraComponent,
    LoginComponent,
    AppComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    GraphComponent,
    GrafoComponent,
  ],
  imports: [
    BrowserModule,FormsModule,BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, 
    LayoutModule, MatToolbarModule, 
    MatSidenavModule, MatIconModule, 
    MatListModule, MatGridListModule, 
    MatCardModule, MatMenuModule, 
    MatTableModule, MatPaginatorModule, 
    HttpClientModule,MatInputModule,
    FormsModule, ReactiveFormsModule,
    MatSortModule,AgGridModule.withComponents([]),
    AppRoutingModuleModule,NgxPaginationModule,
    RouterModule,NgbModule,StorageServiceModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['localhost:4200/api/auth']
      }
    })
   // MDBBootstrapModule.forRoot()
  ],
  providers: [
    ApiService,AuthenticationService,
    StorageService,AuthorizatedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiService,
      multi: true
    },
    D3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class PizzaPartyAppModule { }
