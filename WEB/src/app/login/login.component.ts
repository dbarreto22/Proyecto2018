import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {LoginObject} from "../modelos/login-object.model";
import {AuthenticationService} from "../authentication.service";
import {StorageService} from "../storage.service";
import {Router} from "@angular/router";
import {Sesion} from "../modelos/sesion.model";
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthenticationService,StorageService]
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
     })
  }
 
  public submitLogin(){
    this.submitted = true;
    this.error = null;
    if(this.loginForm.valid){
      alert(JSON.stringify(this.loginForm.value) + 'En el submit login');
      this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe((
        data: string) =>{ this.correctLogin(data);
                        alert(JSON.stringify(data));
                        alert(data);
        },this.error ? (error: any) => alert(JSON.stringify(error)): null);
     
        //error => this.error = JSON.parse(error._body)
       // error =>alert(JSON.stringify(error.string)+'error')
      
    }
  }                                                                       
                          
private correctLogin(data){
  alert(data.JSON+ 'En el correct login');
    this.storageService.setCurrentSession(new Sesion(data,this.loginForm.value));
    this.router.navigate(['/']);
  }
}
