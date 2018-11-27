import { Component, OnInit,ChangeDetectionStrategy, Input } from '@angular/core';
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
  public loading = false;
  public token : string;
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;
  rolElegido:number;
  rolObserver:Subscription;
  @Input() public errorMsg:string;
  
  //private roles:Array<any>=[{'id':'1','nombre':'Director'},{'id':'2','nombre':'Administrador'},{'id':'4','nombre':'Alumno'}];

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private storageService: StorageService,
              private apiService: ApiService,
              private router: Router)
              {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
     })
     console.log(this.errorMsg+ ' error');
//     this.rolElegido$=this.storageService.getRolElegido();
    // this.rolSubscription=this.rolElegido$.subscribe(rol=>this.rolElegido=rol);
//    this.storageService.sendMessage('putitoooo');
  }
 
  public submitLogin(){
    this.loading = true;
    this.submitted = true;
    this.error = null;
    if(this.loginForm.valid){
      this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe((
        res: string) =>{
          if (res != 'Error: Usuario o contraseña incorrecta'){
            localStorage.setItem('session',JSON.stringify(new Sesion(res,null)));
            this.correctLogin();
          }
          else {
          this.errorMsg='Credenciales incorrectas, vuelva a intentarlo';

          }
          this.loading = false;
          //this.storageService.setCurrentSession(new Sesion(res,null)); 
        },err => {
            this.apiService.mensajeConError(err);
            this.loading = false;
            this.errorMsg='Credenciales incorrectas, vuelva a intentarlo';
            this.router.navigate(['/login']);
        }); 
    }
   // this.storageService.sendMessage('la que te pario putitoooo');
  }                                                                       
                          
private correctLogin(){
  var cedula=this.loginForm.get('username').value;
  var usuario:User;
  let rol;
  this.apiService.cargarParametros();
  //this.storageService.setCurrentSession(new Sesion(data,null));
  this.apiService.setearSesion(cedula).subscribe((
    res:User) =>{ 
      //alert('setear Sesion');
      //this.storageService.setUsuario(res);
      usuario=res;
      console.log('El usuario tiene ',usuario);
      let sesion:Sesion=JSON.parse(localStorage.getItem('session'));
      localStorage.setItem('session',JSON.stringify(new Sesion(sesion.token,res)));
      this.apiService.cargarParametros();
      console.log(localStorage.getItem('session')+'--- sesion de login');
      let rolesArray=usuario!=null? usuario.roles:null;
      console.log('roles '+JSON.stringify(rolesArray));
      if(rolesArray!=null){
      //  console.log('Entro a roles ');
      rol=rolesArray[rolesArray.length-1].id!='2'?
      rolesArray[rolesArray.length-1].id:rolesArray[rolesArray.length-2].id;
      if(!rol){
        alert('Este usuario no puede acceder a la web, consulte con el administrador.');
        localStorage.removeItem('session');
        this.router.navigate(['/login']);
      }
      localStorage.setItem('rolElegido',rol);
      this.storageService.setRolElegido(localStorage.getItem('rolElegido'));
      console.log(localStorage.getItem('rolElegido')+' Despues del login');
      this.router.navigate(['/']);}
      else  
        this.errorMsg="Hubo un error con el inisio de sesion, vuelva a intentarlo";

    },err => {
      this.loading=false;
      console.log('Error al obtener usuario codigo: '+ err.message);
      if(err.status==403 || err.status==401){
        this.errorMsg='Credenciales incorrectas, vuelva a intentarlo';
     //   this.router.navigate(['/login']);
      }
    });
   // 
  }
}
