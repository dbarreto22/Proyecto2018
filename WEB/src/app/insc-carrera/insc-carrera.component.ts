import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';

@Component({
  selector: 'app-insc-carrera',
  templateUrl: './insc-carrera.component.html',
  styleUrls: ['./insc-carrera.component.css'],
  providers: [ApiService]
})
export class InscCarreraComponent implements OnInit {
  
   public iduser;
   public idCarrera;

  displayedColumns = ['ID', 'NOMBRE'];
  
  public  carreras:  Array<object> = [];
  
  //private  apiService:  ApiService
  constructor(private  apiService:  ApiService) { }

  ngOnInit() {
    this.carreras;
      this.getCarreras();
  }
  public  getCarreras(){
      this.apiService.getAllCarrera().subscribe((data:  Array<object>) => {
          this.carreras  =  data;
          //console.log(data);
      });
  }
 
    public inscCarrerra(idUser, idCarrera){
      this.apiService.inscripcionCarrera(idUser, idCarrera);
    }
    

}