import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {Curso} from './cursos/Curso';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  public url : string;
  constructor(private _Http: Http) {
    this.url='http://localhost:8080/estudiante/';
   }
   getAllCursos(){
     return this._Http.get(this.url+'curso')
                      .map(res => res.json());
   }
}
