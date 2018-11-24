import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import {Curso} from './cursos/Curso';

@Injectable()

export class EstudianteService {
  public url : string;
  constructor(private  httpClient:  HttpClient) {
    this.url='http://b0b9853a.ngrok.io/miudelar-server/admin/';
   }
   getAllCursos(){
     //admin/usuario
     return this.httpClient.get(`${this.url}usuario`);
    }
    
}
