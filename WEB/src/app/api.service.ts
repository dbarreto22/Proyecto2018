import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor} from  '@angular/common/http';
import {Curso} from './cursos/Curso';
import { Observable, range } from 'rxjs';
import {Http, Response, Headers} from '@angular/http';
import { _ } from 'ag-grid-community';
import { _createNgProbe } from '@angular/platform-browser/src/dom/debug/ng_probe';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';


@Injectable()
export class ApiService {
  API_URL  = 'http://localhost:8080/miudelar-server';   
    //'http://tsi-diego.eastus.cloudapp.azure.com:8080/miudelar-server';



constructor(private  httpClient:  HttpClient,private router: Router,
             private storage:StorageService) { }


canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (localStorage.getItem('access_token')) {
    return true;
  }

  this.router.navigate(['login']);
  return false;
}

getPager(
  totalItems: number,
  currentPage: number = 1,
  pageSize: number = 10
) {
  // calculate total pages
  const totalPages = Math.ceil(totalItems / pageSize);

  let startPage: number, endPage: number;
  if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
  } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
          startPage = 1;
          endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
      } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
      }
  }

  // calculate start and end item indexes
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  const pages = range(startPage, endPage + 1);


  // return object with all pager properties required by the viewr
  return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
  };
}

getAllCarrera(){
    return  this.httpClient.get(`${this.API_URL}/director/carrera`);
}

getAllCursos(){
  return  this.httpClient.get(`${this.API_URL}/estudiante/curso`);
}
getAllExamen(){
  return  this.httpClient.get(`${this.API_URL}/estudiante/curso`);
}

public getToken(){
  console.log(this.storage.getCurrentToken);
  var token = this.storage.getCurrentToken();
  return token; 
}

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  request = request.clone({
    setHeaders: {
      Authorization: `Bearer ${this.storage.getCurrentToken()}`
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
  return  this.httpClient.post(`${this.API_URL}/estudiante/inscripcionCarrera`,json);
}


inscripcionCurso(cedula,idCurso){
  var a: any = {};

  a.cedula = cedula;
  a.idCurso = idCurso;
  
    let json = JSON.stringify(a);
    console.log(json);
    return  this.httpClient.post(`${this.API_URL}/estudiante/inscripcionCurso`,json);
  }

}

