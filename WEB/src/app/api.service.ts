import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL  =  'http://tsi-diego.eastus.cloudapp.azure.com:8080/miudelar-server';

constructor(private  httpClient:  HttpClient) { }

getAllCarrera(){
    return  this.httpClient.get(`${this.API_URL}/director/carrera`);
}

inscripcionCarrera(idUser, idCarrera){
  return  this.httpClient.post(`${this.API_URL}/inscCarrera/`,idUser, idCarrera);
}

}
