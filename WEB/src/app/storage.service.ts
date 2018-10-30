import {Injectable, Input, Output, EventEmitter, ChangeDetectionStrategy} from "@angular/core";
import { Router } from '@angular/router';
import {Sesion} from "./modelos/sesion.model";
import { User } from "./modelos/user.model";
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class StorageService {

//  @Input() users;
  @Output() onSelectRol: EventEmitter<any> = new EventEmitter();
//  @Output() onApproveAll: EventEmitter<any> = new EventEmitter();


  private localStorageService;
  private currentSession : Sesion = null;
  public rolElegido=new Subject<number>();


  

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
    this.rolElegido.next(4);
  }

  setCurrentSession(session: Sesion){
    console.log(JSON.stringify(session)+' Set current sesion');
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(){
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Sesion> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(){
    console.log('acá')                                                      ;
    return this.currentSession!=null?this.currentSession:null;
  }

  setUsuario(usr:User)
  {
    var rolesArray:Array<any>;
    this.currentSession.usr=usr;
    console.log(JSON.stringify(usr.roles));
    rolesArray=usr.roles; 
    this.rolElegido= rolesArray[rolesArray.length-1]!=3?
      rolesArray[rolesArray.length-1].id:rolesArray[rolesArray.length-2].id;
  }

  removeCurrentSession(){
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentUser() {
    var session: Sesion = JSON.parse(localStorage.getItem('session'));
    return (session && session.usr) ? session.usr : null;
  };

  isAuthenticated(){
        return (localStorage.getItem('session') != null) ? true : false;
  };

  getCurrentToken(){
    var session = JSON.parse(localStorage.getItem('session'));
    return  session!=null?session.token:null;
  };

  logout(){
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
  getRolElegido(){
    return this.rolElegido.asObservable();
  }
  
  setRolElegido(aux){
    this.rolElegido;
   // this.rolElegidoSource=aux;
  }
/**********************************************Zona de pruebas 
  getData(){
    return this.message.asObservable();
  }

  setMessage(value: string) {
    this.message.next(value); //it is publishing this value to all the subscribers that have already subscribed to this message
  }

clearMessage() {
  this.message.next();
}

getMessage(): Observable<any> {
  return this.message.asObservable();
}
//*/

}
