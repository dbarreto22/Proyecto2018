import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../api.service';

@Component({
  selector: 'app-insc-carrera',
  templateUrl: './insc-carrera.component.html',
  styleUrls: ['./insc-carrera.component.css'],
  providers: [ApiService],
  template: `Selection:
  <span id="selectedRows"></span>

  <ag-grid-angular
      #agGrid
      style="width: 100%; height: 96%;"
      id="myGrid"
      [rowData]="rowData"
      class="ag-theme-balham"
      [columnDefs]="columnDefs"
      [rowSelection]="rowSelection"
      (selectionChanged)="onSelectionChanged($event)"
      (gridReady)="onGridReady($event)"
      ></ag-grid-angular>`
  
})
export class InscCarreraComponent implements OnInit {
  
  selectedValue = [];
  private gridApi;
  private gridColumnApi;
  private rowData: any[];

  private columnDefs;
  private rowSelection;
  
   public cedula = 3891104;
   public codigo;
   carrera;
   
  displayedColumns = ['ID', 'NOMBRE'];
  
  public  carreras:  Array<object> = [];
  
  //private  apiService:  ApiService
  constructor(private  apiService:  ApiService) {

    this.columnDefs = [
      {
        headerName: "Carrera",
        field: "carrera",
        width: 150
      },
      {
        headerName: "Codigo",
        field: "codigo",
        width: 90
      }];
      this.rowSelection = "single";
   }

   onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    var selectedRowsString = "";
    selectedRows.forEach(function(selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.athlete;
    });
    document.querySelector("#selectedRows").innerHTML = selectedRowsString;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.apiService.getAllCarrera().subscribe((data:  Array<object>) => {
      this.rowData  =  data;
      console.log(data);
  });
}


  ngOnInit() {
   // this.carreras;
     // this.getCarreras();
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
  //  }
   /* else{
     let updateItem = this.selectedValue.find(this.findIndexToUpdate, type.carrera);
     this.codigo = updateItem;
     console.log(this.codigo);
     let index = this.selectedValue.indexOf(updateItem);

     this.selectedValue.splice(index, 1);
    }*/

  }

  findIndexToUpdate(type) { 
        return type.carreras === this;
    }
 
    public inscCarrerra(){
      console.log(this.selectedValue[0]);
      //this.codigo = this.selectedValue[0];
      this.apiService.inscripcionCarrera(this.cedula, this.codigo).subscribe();
    }

    

}