import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from "../storage.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { State, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { SelectableSettings, RowArgs, PageChangeEvent } from "@progress/kendo-angular-grid";
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
        this.loading = false
        apiService.mensajeConError(ee);

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

  public skip = 0;
  public state: State = {
    skip: 0,
    take: 5
  }

  public mySelection: string[] = [];
  public mySelectionKey(context: RowArgs): string {
    return context.dataItem.codigo;
  }

  public pageChange(event: PageChangeEvent): void {
    console.log(this.mySelection[0]);
    this.skip = event.skip;

  }

  change() {
    this.asignaturas.subscribe(
      (data: Array<asignatura>) => {
        data.forEach(asig => {
          if (asig.codigo == this.mySelection[0]) {
            this.codigo = asig.codigo;
            this.nombreAsignatura = asig.nombre;
            console.log(this.codigo);

          }
        })

      },
      err => {
        this.apiService.mensajeConError(err);
      }
    )
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



  public mostrarPrevias() {
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
    this.apiService.deleteAsignatura(this.codigo).subscribe(
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
