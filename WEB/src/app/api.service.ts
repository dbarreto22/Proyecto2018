import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL  =  'http://localhost:9444';

constructor(private  httpClient:  HttpClient) { }

getAllCarrera(){
    return  this.httpClient.get(`${this.API_URL}/inscCarrera`);
}

createCarrera(carrera){
  return  this.httpClient.post(`${this.API_URL}/crearCarrera/`,carrera);
}

}
