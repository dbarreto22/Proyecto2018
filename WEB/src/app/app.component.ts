import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http'; 
import {StorageService} from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthenticationService,StorageService]
})
export class AppComponent implements OnInit{
  title = 'MiUdelar';
  idTipo = 4;
  loged:boolean;
  constructor(public StorageService:StorageService){}
  ngOnInit(){
    this.loged=this.StorageService.isAuthenticated()    

  }
}

