import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpRequest,
  HttpHandler, HttpEvent, HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { URLSearchParams } from '@angular/http';
import { _ } from 'ag-grid-community';
import { _createNgProbe } from '@angular/platform-browser/src/dom/debug/ng_probe';
import { Router } from '@angular/router';
import { Sesion } from './modelos/sesion.model';
import { carrera } from './modelos/carrera.model';
import { asignatura } from './modelos/asignatura.model';
import { usuario } from './modelos/usuario.model';
import { cursos } from './modelos/cursos.model';
import { examenes } from './modelos/examenes.model';
import { asignaturaCarrera } from './modelos/asignaturaCarrera.model';

const httpOptions: {
  headers?: HttpHeaders,
  observe?: 'body',
  params?: HttpParams,
  reportProgress?: boolean,
  responseType: 'text',
  withCredentials?: boolean

} = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text'
};

var params = new HttpParams();
var paramsA: URLSearchParams = new URLSearchParams();

let paramsCalificaciones = new HttpParams();
paramsCalificaciones = paramsCalificaciones.append('idAsig_Carrera', localStorage.getItem('idAsigCarrera'));

@Injectable()
export class ApiService {
   API_URL  = 'http://localhost:8080/miudelar-server'; 
  // url = 'http://localhost:8080/miudelar-server/director/carrera/';  
//  API_URL = 'http://f4b051cb.ngrok.io/miudelar-server';
  //url = 'http://b0b9853a.ngrok.io/miudelar-server/director/carrera/';  
  //'http://tsi-diego.eastus.cloudapp.azure.com:8080/miudelar-server';

  public cedula;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.cargarParametros();
  }

  public codigo = localStorage.getItem('codigoABM');

  getAllCarrera(): Observable<Array<Object>> {
    return this.httpClient.get<Array<Object>>(`${this.API_URL}/director/carrera`);
  }
  getCarreraByCedula(): Observable<Array<Object>> {
    return this.httpClient.get<Array<Object>>(`${this.API_URL}/estudiante/carrera/`+this.cedula);
  }

  getAllAsignatura(): Observable<Array<Object>> {
    return this.httpClient.get<Array<Object>>(`${this.API_URL}/director/asignatura`);
  }

  getAllUser(): Observable<Array<Object>> {
    return this.httpClient.get<Array<Object>>(`${this.API_URL}/admin/usuario`);
  }

  getAsignaturaByCarrera(idCarrera) {
    let data = { idCarrera: idCarrera };
    console.log(data);
    return this.httpClient.get(`${this.API_URL}/director/asignatura/carrera/` + idCarrera);
  }

  getAllAsignaturaCarrera(): Observable<Array<asignaturaCarrera>> {
    return this.httpClient.get<Array<asignaturaCarrera>>(`${this.API_URL}/director/asignaturacarrera`);
  }

  getAsignaturaCarreraByCarrera(idCarrera): Observable<Array<Object>> {
    return this.httpClient.get<Array<Object>>(`${this.API_URL}/bedelia/asignaturaCarrera/` + idCarrera);
  }

  //getAllCursos() : Observable<cursos[]>{
  //  return  this.httpClient.get<cursos[]>(`${this.API_URL}/estudiante/curso/` + this.cedula);
  getAllCursos(): Observable<Array<cursos>> {
    return this.httpClient.get<Array<cursos>>(`${this.API_URL}/estudiante/curso` + this.cedula);
  }

  getCursosByCedula(): Observable<Array<cursos>> {
    return this.httpClient.get<Array<cursos>>(`${this.API_URL}/estudiante/curso/` + this.cedula);
  }

  getAllExamen(): Observable<Array<examenes>> {
    return this.httpClient.get<Array<examenes>>(`${this.API_URL}/estudiante/examen`);
  }

  getExamenByCedula(): Observable<Array<examenes>> {
    return this.httpClient.get<Array<examenes>>(`${this.API_URL}/estudiante/examen/` + this.cedula);
  }

  getCalificacionesEstudiante(): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/estudiante/consultarCalificaciones/` + this.cedula);
  }

  public getToken() {
    var sesion: Sesion = JSON.parse(localStorage.getItem('session'));
    return sesion != null ? sesion.token : null;
  }

  setearSesion(cedula) {
    return this.httpClient.get(`${this.API_URL}/admin/usuario/` + cedula)
  }

  getUsuario(cedula): Observable<usuario> {
    return this.httpClient.get<usuario>(`${this.API_URL}/admin/usuario/` + cedula)
  }

  getUsuarioRol(cedula): Observable<usuario> {
    return this.httpClient.get<usuario>(`${this.API_URL}/admin/usuario/` + cedula)
  }

  getCarrera(codigo): Observable<carrera> {
    return this.httpClient.get<carrera>(`${this.API_URL}/director/carrera/` + codigo)
  }

  getAsignatura(codigo): Observable<asignatura> {
    return this.httpClient.get<asignatura>(`${this.API_URL}/director/asignatura/` + codigo)
  }

  getprevias(idCurso) {
    return this.httpClient.get(`${this.API_URL}/director/previas/` + idCurso);
  }

  getUserRol(): Observable<Array<usuario>> {
    return this.httpClient.get<Array<usuario>>(`${this.API_URL}/admin/rol`);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
    return next.handle(request);
  }

  inscripcionCarrera(cedula, codigo) {
    var a: any = {};
    a.cedula = cedula;
    a.codigo = codigo;
    let json = JSON.stringify(a);
    console.log(json);
    return this.httpClient.post(`${this.API_URL}/estudiante/inscripcionCarrera`, json, httpOptions);
  }

  inscripcionCurso(idCurso) {
    var a: any = {};
    a.cedula = this.cedula; 
    a.idCurso = idCurso;
    let json = JSON.stringify(a);
    console.log(json);
    return this.httpClient.post(`${this.API_URL}/estudiante/inscripcionCurso`, json, httpOptions);
  }

  inscripcionExamen(idCurso) {
    var a: any = {};
    a.cedula = this.cedula;
    a.idCurso = idCurso;
    let json = JSON.stringify(a);
    console.log(json);
    return this.httpClient.post(`${this.API_URL}/estudiante/inscripcionExamen`, json, httpOptions);
  }

  ingresarCarrera(DtCarrera: carrera) {
    console.log(DtCarrera);
    return this.httpClient.post(`${this.API_URL}/director/carrera`, DtCarrera, httpOptions);
  }

  ingresarAsignatura(DtAsignatura: asignatura) {
    return this.httpClient.post(`${this.API_URL}/director/asignatura`, DtAsignatura, httpOptions);
  }

  ingresarUsuario(DtUsuario: usuario) {
    return this.httpClient.post(`${this.API_URL}/admin/usuario`, DtUsuario, httpOptions);
  }

  asignarAsigCarrera(codAsig, codCarrera) {
    var a: any = {};
    a.codigoAsignatura = codAsig;
    a.codigoCarrera = codCarrera;
    let json = JSON.stringify(a);
    return this.httpClient.post(`${this.API_URL}/director/asignaturacarrera`, json, httpOptions);
  }

  deleteUser(usuario :string){
    var a: any = {}
    a.cedula=usuario;
    let json=JSON.stringify(a);
    return  this.httpClient.post(`${this.API_URL}/admin/usuario.delete`,json,httpOptions);
  }

  modificarUser(usuario: usuario) {
    return this.httpClient.post(`${this.API_URL}/admin/usuario.edit`, usuario, httpOptions);
  }

  deleteCarrera(codigo) {
    var a: any = {};
    a.codigo = codigo;
    let json = JSON.stringify(a);
    console.log(json);
    return this.httpClient.post(`${this.API_URL}/director/carrera.delete`, json, httpOptions);
  }

  deleteAsignatura(codigo) {
    var a: any = {};
    a.codigo = codigo;
    let json = JSON.stringify(a);
    console.log(json);
    return this.httpClient.post(`${this.API_URL}/director/asignatura.delete`, json, httpOptions);
  }

  modificarCarrera(carrera: carrera) {
    return this.httpClient.post(`${this.API_URL}/director/carrera.edit`, carrera, httpOptions);
  }

  modificarAsignatura(dtAsignatura: asignatura) {
    return this.httpClient.post(`${this.API_URL}/director/asigna                                                                                                                                                                                                                                                                                                                                                            tura.edit`, dtAsignatura, httpOptions);
  }

  asignarRol(cedula, idRol) {
    var a: any = {};
    a.cedula = cedula;
    a.idRol = idRol;
    let json = JSON.stringify(a);
    console.log(json);
    return this.httpClient.post(`${this.API_URL}/admin/usuario.addRol`, json, httpOptions);
  }
  //Obtengo los roles y demas datos del usuario que se logueó
  cargarParametros() {
    if (JSON.parse(localStorage.getItem('session')) != null && JSON.parse(localStorage.getItem('session')).usr != null) {
      params.set('cedula', JSON.parse(localStorage.getItem('session')).usr.cedula);
      this.cedula = JSON.parse(localStorage.getItem('session')).usr.cedula;
    }
//    paramsA.set('idCarrera', localStorage.getItem('codigoCarreraSelecionada'));
//    return  this.httpClient.post(`${this.API_URL}/admin/usuario.addRol`, json, httpOptions);
  }/*
//Obtengo los roles y demas datos del usuario que se logueó
cargarParametros() {
  if (JSON.parse(localStorage.getItem('session')) != null && JSON.parse(localStorage.getItem('session')).usr != null ) {
    params.set('cedula', JSON.parse(localStorage.getItem('session')).usr.cedula);
    this.cedula = JSON.parse(localStorage.getItem('session')).usr.cedula;
  }*/

  agregarPrevia(idMadre, idPrevia) {
    var a: any = {};
    a.idMadre = idMadre;
    a.idPrevia = idPrevia;
    let json = JSON.stringify(a);
    return this.httpClient.post(`${this.API_URL}/director/previas.addPrevia`, json, httpOptions);

  }

mensajeSinError(mensaje:any,aux:number){
  if (mensaje == 'OK'){
    if(aux==1)  
      alert("Creado correctamente");
    if(aux==2)
      alert("Asignado correctamente");
    if(aux==3)
      alert("Inscripción correcta");
    if(aux==4)  
      alert("Eliminado correctamente ");
    if(aux==5)  
      alert("Modificado correctamente ");
    }
    else
      alert(mensaje);
  }

  mensajeConError(mensaje: any) {
    console.log(mensaje.status + ' ' + mensaje.message);
    if (mensaje.status == 403) {
      alert('Su sesión ha expirado.');
      this.router.navigate(['/login']);
    }
    else {
      alert('Ha sucedido un error al procesar su solicitud, vuelva a intentarlo mas tarde ');
    }
  }
}

