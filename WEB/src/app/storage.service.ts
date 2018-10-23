import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import {Sesion} from "./modelos/sesion.model";

@Injectable()
export class StorageService {

  private localStorageService;
  private currentSession : Sesion = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Sesion){
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(){
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Sesion> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(){
    return this.currentSession;
  }

  removeCurrentSession(){
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentUser() {
    var session: Sesion = this.getCurrentSession();
    return (session && session.cedula) ? session.cedula : null;
  };

  isAuthenticated(){
      return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(){
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  logout(){
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

}
