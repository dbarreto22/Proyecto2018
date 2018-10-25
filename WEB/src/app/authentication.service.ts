import {Injectable} from "@angular/core";
import { HttpClient} from  '@angular/common/http';
import {Observable} from "rxjs";
import {LoginObject} from "./modelos/login-object.model";
import {Sesion} from "./modelos/sesion.model";
import { format } from "util";

@Injectable()
export class AuthenticationService {

  constructor(private http:  HttpClient) {}

  private basePath = 'http://localhost:8080/miudelar-server/admin/';

  login(loginObj){
    console.log(JSON.stringify(loginObj))
     return this.http.post(this.basePath + 'login', loginObj, {responseType: 'text'});
  }

  logout(){
    //return this.http.post(this.basePath + 'logout', {}).map(this.extractData);
  }

  private extractData(res) {
    let body = res.json();
    return body;
  }
}
  