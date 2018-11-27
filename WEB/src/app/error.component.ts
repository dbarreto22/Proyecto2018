import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-error',
  template: `
  <div>
    <h1>La página solicitada no existe o esta en mantenimiento</h1>
  </div>`,
  styleUrls: []
})
export class ErrorComponent {
  rolElegido:number;
  Titulo:string;    
  constructor() 
  {
    
  }
}

