import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-toolbar-director',
  templateUrl: './toolbar-director.component.html',
  styleUrls: ['./toolbar-director.component.css']
})
export class ToolbarDirectorComponent implements OnInit {
  @Input() rolElegido:number;
  Titulo:string;    
  constructor(private authentication:AuthenticationService) 
  {
    
  }
  ngOnInit() {
    this.rolElegido=Number(localStorage.getItem('rolElegido'));
  }
  logOut(){
    console.log('click en logout');
    this.authentication.logout();

  }
}
