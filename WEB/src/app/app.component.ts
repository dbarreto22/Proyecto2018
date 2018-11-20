import { Component, OnInit,ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http'; 
import {StorageService} from './storage.service';
import {User} from './modelos/user.model';
import { Subscription, Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthenticationService,StorageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'MiUdelar';
  usr:User;
  roles:Array<any>;
  loged:boolean;
  rolElegido:number=1;
  message: string;
  subscription: Subscription;
  constructor(public storageService:StorageService){

  }
  ngOnInit(){
    this.loged=this.storageService.isAuthenticated();
    this.rolElegido=Number(localStorage.getItem('rolElegido'));
   // console.log('En el Init '+this.rolElegido);
  }
    ngOnDestroy(){
    }
    getrol(){
      console.log('En el getrol '+Number(localStorage.getItem('rolElegido')));
      return this.rolElegido=Number(localStorage.getItem('rolElegido'));
    }
    login(){
      return false
    }
    getUrl()
    {
      return "url('../assets/background.jpg')";
    }
  }
