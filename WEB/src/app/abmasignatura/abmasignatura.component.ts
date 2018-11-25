import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from "../storage.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { State, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { SelectableSettings } from "@progress/kendo-angular-grid";
import { asignatura } from "../modelos/asignatura.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-elegir-carrera",
  templateUrl: "./abma.component.html",
  styleUrls: ["./abmasignatura.component.css"],
  providers: [ApiService, NgbPaginationConfig, StorageService]
})
export class abmAsignaturaComponent implements OnInit {
  public codigo;
  public nombreAsignatura;
  public asignatura: asignatura;
  public cedula;
  public asignaturas: Observable<Array<Object>>;
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public mySelection: any[];
  public dialogOpened = false;
  public loading;

  constructor(
    public http: HttpClient,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loading = true;
    this.setSelectableSettings();
    this.asignaturas = this.apiService.getAllAsignatura();

    this.asignaturas.subscribe(
      () => this.loading = false,
      ee => {
          apiService.mensajeConError(ee);
          this.loading = false
      }
  )
}

  ngOnInit() {
    let rolElegido = localStorage.getItem("rolElegido");
    if (rolElegido != "3") {
      alert("El rol actual no puede acceder a esta función.");
      this.router.navigate(["/"]);
    }
  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single"
    };
  }

  public action() {
    this.dialogOpened = false;
  }

  eliminarAsignatura() {
    if (this.codigo != undefined) {
      this.dialogOpened = true;
    } else alert("Debe seleccionar una asignatura para continuar.");
    this.router.navigate(["/setingsAsignatura"]);
  }

  public crearAsignatura() {
    this.router.navigate(["/ingAsignatura"]);
  }

  change({index}) {
    if (!!index || index == 0) {
      this.asignaturas.subscribe(
      (data: Array<asignatura>)=> {
        this.asignatura = data[index];
        this.codigo = this.asignatura.codigo;
        this.nombreAsignatura = this.asignatura.nombre;
        console.log(this.codigo);
      },
      err=>{
        this.apiService.mensajeConError(err);
      }
    )}}

public mostrarPrevias(){
  if (this.codigo != undefined) {
    localStorage.setItem('idCurso', this.codigo);
    this.router.navigate(['/grafo']);
  }
  else alert('Debe seleccionar un curso');
}

  public modificarAsignatura() {
    if (this.codigo != undefined) {
      localStorage.setItem("codigoAsignaturaABM", this.codigo);
      this.router.navigate(["/modificarAsignatura"]);
    } else alert("Debe seleccionar una asignatura para continuar.");
  }

  public confirmarEliminarAsignatura() {
    this.apiService.deleteAsignatura(this.asignatura.codigo).subscribe(
      data => {
        this.apiService.mensajeSinError(data, 4);
      },
      err => {
        this.apiService.mensajeConError(err);
      }
    );
    this.dialogOpened = false;
    this.router.navigate(["/setingsAsignatura"]);
  }
}
