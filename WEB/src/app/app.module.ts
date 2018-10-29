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
//import { MDBBootstrapModule } from 'angular-bootstrap-md';
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
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { InscExamenComponent } from './insc-examen/insc-examen.component';



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
    InscExamenComponent 
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
    RouterModule,NgbModule,GridModule,BrowserAnimationsModule,BrowserModule,InputsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['localhost:4200/api/auth']
      }
    }),
    GridModule
   // MDBBootstrapModule.forRoot()
  ],
  providers: [
    ApiService,AuthenticationService,
    StorageService,AuthorizatedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class PizzaPartyAppModule { }