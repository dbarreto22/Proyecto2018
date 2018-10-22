import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from  '@angular/common/http';
import {Curso} from './cursos/Curso';
import { Observable, range } from 'rxjs';
import {Http, Response, Headers} from '@angular/http';
import { _ } from 'ag-grid-community';
import { _createNgProbe } from '@angular/platform-browser/src/dom/debug/ng_probe';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer {JWT Token}'})
};
/*
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');*/


@Injectable()
export class ApiService {
  API_URL  = //'http://localhost:8080/miudelar-server';   
    'http://tsi-diego.eastus.cloudapp.azure.com:8080/miudelar-server';



constructor(private  httpClient:  HttpClient,private router: Router) { }


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
    return  this.httpClient.get(`${this.API_URL}/estudiante/carrera`);
}



inscripcionCarrera(token,cedula,codigo){
var a: any = {};
a.token = token;
a.cedula = cedula;
a.codigo = codigo;

  let json = JSON.stringify(a);
  console.log(json);
  return  this.httpClient.post(`${this.API_URL}/estudiante/inscripcionCarrera`,json, httpOptions);
}


createCarrera(carrera){
  this.httpClient.post(`${this.API_URL}/crearCarrera/`,carrera);
}


getAllCurso(){
  return this.httpClient.post(`${this.API_URL}/estudiante/curso`,null);
}
inscripcionCurso(token,cedula,idCurso){
  var a: any = {};
  a.token = token;
  a.cedula = cedula;
  a.idCurso = idCurso;
  
    let json = JSON.stringify(a);
    console.log(json);
    return  this.httpClient.post(`${this.API_URL}/estudiante/inscripcionCarrera`,json, httpOptions);
  }

}

