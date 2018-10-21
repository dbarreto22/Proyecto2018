import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from  '@angular/common/http';
import {Curso} from './cursos/Curso';
import { Observable } from 'rxjs';
import {Http, Response, Headers} from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer {JWT Token}'})
};


@Injectable()
export class ApiService {
  API_URL  = 'http://localhost:8080/miudelar-server';   
    //'http://tsi-diego.eastus.cloudapp.azure.com:8080/miudelar-server';



constructor(private  httpClient:  HttpClient) { }

getAllCarrera(){
    return  this.httpClient.get(`${this.API_URL}/director/carrera`);
}

inscripcionCarrera(cedula,codigo){
var a: any = {};
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

}

