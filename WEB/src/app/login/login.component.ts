import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {LoginObject} from "../modelos/login-object.model";
import {AuthenticationService} from "../authentication.service";
import {StorageService} from "../storage.service";
import {Router} from "@angular/router";
import {Sesion} from "../modelos/sesion.model";
import { ApiService } from '../api.service';
import {User} from '../modelos/user.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthenticationService,StorageService],
  //changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit {

  public token : string;
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;
  rolElegido:number;
  rolObserver:Subscription;
  //private roles:Array<any>=[{'id':'1','nombre':'Director'},{'id':'2','nombre':'Administrador'},{'id':'4','nombre':'Alumno'}];

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private storageService: StorageService,
              private apiService: ApiService,
              private router: Router) {
                this.rolObserver=this.storageService.rolElegido.subscribe({next:(v)=>{
                  this.rolElegido=v;
                  console.log('Valor de subscripcion '+v);
                }});
               }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
     })
//     this.rolElegido$=this.storageService.getRolElegido();
    // this.rolSubscription=this.rolElegido$.subscribe(rol=>this.rolElegido=rol);
//    this.storageService.sendMessage('putitoooo');
  }
 
  public submitLogin(){
    this.submitted = true;
    this.error = null;
    if(this.loginForm.valid){
      this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe((
        res: string) =>{
          localStorage.setItem('session',JSON.stringify(new Sesion(res,null)));
          //this.storageService.setCurrentSession(new Sesion(res,null)); 
          this.correctLogin();
        },err => {
          console.log('Error en el login '+err);
        });
      
    }
   // this.storageService.sendMessage('la que te pario putitoooo');
  }                                                                       
                          
private correctLogin(){
  var cedula=this.loginForm.get('username').value;
  var usuario:User;
  //this.storageService.setCurrentSession(new Sesion(data,null));
  this.apiService.getUsuario(cedula).subscribe((
    res:User) =>{ 
      //this.storageService.setUsuario(res);
      usuario=res;
      //console.log('El usuario tiene '+usuario.nombre);
      let sesion:Sesion=JSON.parse(localStorage.getItem('session'));
      localStorage.setItem('session',JSON.stringify(new Sesion(sesion.token,res)));
      //console.log(localStorage.getItem('session')+'--- sesion de login');
      let rolesArray=usuario!=null? usuario.roles:null;
      console.log('roles '+JSON.stringify(rolesArray));
      if(rolesArray!=null){
      //  console.log('Entro a roles ');
        localStorage.setItem('rolElegido',rolesArray[rolesArray.length-1]!=3?
      rolesArray[rolesArray.length-1].id:rolesArray[rolesArray.length-2].id)

      this.storageService.setRolElegido(localStorage.getItem('rolElegido'));}
     // console.log(localStorage.getItem('rolElegido')+' Despues del login');
    },err => {
      console.log('Error al obtener usuario---'+err);
    });
    this.router.navigate(['/cursos']);
  }
}
