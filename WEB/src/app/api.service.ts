import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import {Curso} from './cursos/Curso';
import { Observable } from 'rxjs';
import {Http, Response, Headers} from '@angular/http';



@Injectable()
export class ApiService {
  API_URL  =  'http://localhost:8080';
  rowData;
constructor(private  httpClient:  HttpClient) { }

getAllCarrera(){
    return  this.httpClient.get(`${this.API_URL}/inscCarrera`);
}

createCarrera(carrera){
  this.httpClient.post(`${this.API_URL}/crearCarrera/`,carrera);
}


getAllCurso(){
  return this.httpClient.post(`${this.API_URL}/estudiante/curso`,null);
}

inscripcionCarrera(idUsuario,idCurso){
  //this.httpClient.post(`${this.API_URL}/crearCarrera/`,carrera);
}
}

