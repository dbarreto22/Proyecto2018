import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-insc-carrera',
  templateUrl: './insc-carrera.component.html',
  styleUrls: ['./insc-carrera.component.css'],
  providers: [ApiService],
  })
  
export class InscCarreraComponent implements OnInit {
  
   public cedula = 3891104;
   public codigo;
   carrera;
   
  displayedColumns = ['ID', 'NOMBRE'];
  
  public  carreras:  Array<object> = [];
  
  //private  apiService:  ApiService
  constructor(private  apiService:  ApiService) {}

  ngOnInit() {
    this.carreras;
    this.getCarreras();
  }

  public  getCarreras(){
      this.apiService.getAllCarrera().subscribe((data:  Array<object>) => {
          this.carreras  =  data;
          console.log(data);
      });
  }

  change(e, type){
    console.log(e.checked);
    console.log(type);
  //  if(e.checked){
     // this.selectedValue.push(type);
        this.codigo = type;
        console.log(this.codigo);
  }
  /*
    else{
     let updateItem = this.selectedValue.find(this.findIndexToUpdate, type.carrera);
     this.codigo = updateItem;
     console.log(this.codigo);
     let index = this.selectedValue.indexOf(updateItem);

     this.selectedValue.splice(index, 1);
    }

  }

  findIndexToUpdate(type) { 
        return type.carreras === this;
    }
 */
    public inscCarrerra(){
    //  console.log(this.selectedValue[0]);
      //this.codigo = this.selectedValue[0];
      this.apiService.inscripcionCarrera(this.cedula, this.codigo).subscribe();
    }
}