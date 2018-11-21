import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,HttpParams} from  '@angular/common/http';
import {Curso} from './cursos/Curso';
import { Observable, range } from 'rxjs';
import {Http, Response, Headers,URLSearchParams} from '@angular/http';
import { _ } from 'ag-grid-community';
import { _createNgProbe } from '@angular/platform-browser/src/dom/debug/ng_probe';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';
import { Sesion } from './modelos/sesion.model';
import { carrera } from './modelos/carrera.model';
import { asignatura } from './modelos/asignatura.model';
import { usuario } from './modelos/usuario.model';
import { cursos } from './modelos/cursos.model';
import { map } from 'rxjs/operators';

const httpOptions : {
  headers?: HttpHeaders,
            observe?: 'body',
            params?: HttpParams,
            reportProgress?: boolean,
            responseType: 'text',
            withCredentials?: boolean

}={headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
responseType: 'text'};

const httpOptions2 = {
  headers: new HttpHeaders({ 'Content-Type': 'text/html'}),
  responseType:'text'

};
var params = new HttpParams();

const paramsCarrera = new HttpParams()
  .set('codigo', localStorage.getItem('codigoABM'));

const paramsAsignatura = new HttpParams()
  .set('codigo', localStorage.getItem('codigoAsignaturaABM'));


let paramsCalificaciones = new HttpParams();
paramsCalificaciones = paramsCalificaciones.append('idAsig_Carrera', localStorage.getItem('idAsigCarrera'));


@Injectable()
export class ApiService {
  API_URL  = 'http://localhost:8080/miudelar-server'; 
  url = 'http://localhost:8080/miudelar-server/director/carrera/';  
    //'http://tsi-diego.eastus.cloudapp.azure.com:8080/miudelar-server';

    public cedula;
constructor(private  httpClient:  HttpClient,private router: Router,
             private storage:StorageService) {
              let paramsA: URLSearchParams = new URLSearchParams();
              paramsA.set('idCarrera', localStorage.getItem('codigoCarreraSelecionada'));
            }         

//public cedula =  JSON.parse(localStorage.getItem('session')).usr.cedula;; 
           
public codigo = localStorage.getItem('codigoABM');

getAllCarrera(): Observable<object[]>{
    return  this.httpClient.get<object[]>(this.url);
}

getAllAsignatura(){
  return  this.httpClient.get(`${this.API_URL}/director/asignatura`);
}

getAllUser(){
  return  this.httpClient.get(`${this.API_URL}/admin/usuario`);
}
 
getAsignaturaByCarrera(idCarrera){
  let data = {idCarrera: idCarrera};
  console.log(data);
  return  this.httpClient.get(`${this.API_URL}/director/asignatura/carrera/`+idCarrera);
}


getAsignaturaCarreraByCarrera(idCarrera){
  return  this.httpClient.get(`${this.API_URL}/bedelia/asignaturaCarrera/`+idCarrera);
}

getAllCursos() : Observable<cursos[]>{
  return  this.httpClient.get<cursos[]>(this.url + this.cedula);
}

getAllExamen(){ 
  return  this.httpClient.get(`${this.API_URL}/estudiante/examen`+this.cedula);
}
 
getCalificacionesEstudiante(idAsigCarrera){ 
  return  this.httpClient.get(`${this.API_URL}/estudiante/consultarCalificaciones/`+this.cedula+idAsigCarrera);
}

public getToken(){
  var sesion:Sesion = JSON.parse(localStorage.getItem('session'));
  return sesion!=null?sesion.token:null; 
}

getUsuario(cedula){
  return this.httpClient.get(`${this.API_URL}/admin/usuario/`+cedula)
}

getCarrera(codigo){
  return this.httpClient.get(`${this.API_URL}/director/carrera/`+codigo)
}

getAsignatura(codigo){
  let data = {codigo: codigo};
  console.log(data);
  return this.httpClient.get(`${this.API_URL}/director/asignatura/`+codigo)
}

getprevias(idCurso){
  return this.httpClient.get(`${this.API_URL}/director/previas/`+idCurso);
}

getUserRol(){
  return this.httpClient.get(`${this.API_URL}/admin/rol`);
}

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  request = request.clone({
    setHeaders: {
      Authorization: `Bearer ${this.getToken()}`
    }
  });
  return next.handle(request);
}

inscripcionCarrera(cedula,codigo){
var a: any = {};
a.cedula = cedula;
a.codigo = codigo;
  let json = JSON.stringify(a);
  console.log(json);
  return  this.httpClient.post(`${this.API_URL}/estudiante/inscripcionCarrera`,json, httpOptions);
}

inscripcionCurso(cedula,idCurso){
  var a: any = {};
  a.cedula = cedula;
  a.idCurso = idCurso;
    let json = JSON.stringify(a);
    console.log(json);
    return  this.httpClient.post(`${this.API_URL}/estudiante/inscripcionCurso`,json,httpOptions);
  }

  inscripcionExamen(cedula,idCurso){
    var a: any = {};
    a.cedula = cedula;
    a.idCurso = idCurso;
      let json = JSON.stringify(a);
      console.log(json);
      return  this.httpClient.post(`${this.API_URL}/estudiante/inscripcionExamen`,json, {'responseType': 'text'});
  }

  ingresarCarrera(DtCarrera :carrera){
    console.log(DtCarrera);
    return  this.httpClient.post(`${this.API_URL}/director/carrera`,DtCarrera, {'responseType': 'text'});
  }

  ingresarAsignatura(DtAsignatura : asignatura){
    return  this.httpClient.post(`${this.API_URL}/director/asignatura`,DtAsignatura, {'responseType': 'text'});
  }

  ingresarUsuario(DtUsuario : usuario){
    return  this.httpClient.post(`${this.API_URL}/admin/usuario`,DtUsuario,{'responseType': 'text'} );
  }

  asignarAsigCarrera(codAsig, codCarrera){
    var a: any = {};
    a.codigoAsignatura = codAsig;
    a.codigoCarrera = codCarrera;
      let json = JSON.stringify(a);
    return  this.httpClient.post(`${this.API_URL}/director/asignaturacarrera`,json,httpOptions);
  }

  deleteUser(usuario :usuario){
    return  this.httpClient.post(`${this.API_URL}/admin/usuario.delete`,usuario,{'responseType': 'text'});
  }

  modificarUser(usuario :usuario){
    return  this.httpClient.post(`${this.API_URL}/admin/usuario.edit`,usuario,{'responseType': 'text'});
  }

  deleteCarrera(codigo){
    var a: any = {};
    a.codigo = codigo;
      let json = JSON.stringify(a);
    console.log(json);
    return  this.httpClient.post(`${this.API_URL}/director/carrera.delete`,json, {'responseType': 'text'});
  }

  deleteAsignatura(codigo){
    var a: any = {};
    a.codigo = codigo;
      let json = JSON.stringify(a);
    console.log(json);
    return  this.httpClient.post(`${this.API_URL}/director/asignatura.delete`,json, {'responseType': 'text'});
  }

  modificarCarrera(carrera :carrera){
    return  this.httpClient.post(`${this.API_URL}/director/carrera.edit`,carrera,{'responseType': 'text'});
  }

  modificarAsignatura(dtAsignatura :asignatura){
    return  this.httpClient.post(`${this.API_URL}/director/asignatura.edit`,dtAsignatura,{'responseType': 'text'});
  }

  asignarRol(cedula,idRol){
    var a: any = {};
    a.cedula = cedula;
    a.idRol = idRol;
    let json = JSON.stringify(a);
    return  this.httpClient.post(`${this.API_URL}/admim/usuario/addRol`, json, httpOptions);
  }
//Obtengo los roles y demas datos del usuario que se logueó
cargarParametros(){
  params.set('cedula',JSON.parse(localStorage.getItem('session')).usr.cedula);
  this.cedula = JSON.parse(localStorage.getItem('session')).usr.cedula; 

}
}

