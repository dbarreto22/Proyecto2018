import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { cursos} from './modelos/cursos.model';
import { Curso} from './cursos/Curso';




const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  var params = new HttpParams();
export abstract class NorthwindService extends BehaviorSubject<GridDataResult> {
    public loading: boolean;
    public  cursos:  Array<cursos> = [];
    private BASE_URL = 'http://localhost:8080/miudelar-server/estudiante/curso';
    public cursosGrid = new Array<Curso>();
    


    constructor(
        private http: HttpClient,
        protected tableName: string
    ) {
        super(null);
        params.set('cedula',JSON.parse(localStorage.getItem('session')).usr.cedula);
    
    }
    public query(): void {
        this.fetch()
            .subscribe(x => super.next(x));
    }

    protected fetch(): Observable<GridDataResult> {
        this.loading = true;

        return this.http
            .get(`${this.BASE_URL}`,{params : params})
            .pipe(
                map(response => (<GridDataResult>{
                    data: response['value'],
                    total: parseInt(response['@odata.count'], 10)
                })),
                tap(() => this.loading = false)
            );
    }
    public getCursosGrid(){
        this.cursos.forEach(element => {
          var curso= new Curso;
          curso.codigoAsignatura = element.asignatura_Carrera.asignatura.codigo ; 
          curso.codigoCarrera= element.asignatura_Carrera.carrera.codigo;
          curso.idCurso= element.id;
          curso.idAsigCarrera = element.asignatura_Carrera.id;
          curso.nombreAsignatura= element.asignatura_Carrera.asignatura.nombre;
          curso.nombreCarrera=element.asignatura_Carrera.carrera.nombre;
          this.cursosGrid.push(curso);
        });
   }
  
}


/*
@Injectable()
export class ProductsService extends NorthwindService {
    constructor(http: HttpClient) { super(http, 'Products'); }

    public queryForCategory({ CategoryID }: { CategoryID: number }, state?: any): void {
        this.query();
    }

    public queryForProductName(ProductName: string, state?: any): void {
        this.query();
    }

}
*/
@Injectable()
export class gridCursosService extends NorthwindService {
    constructor(http: HttpClient) { super(http, 'Categories'); }

    queryAll(st?: any): Observable<GridDataResult> {
        const state = Object.assign({}, st);
        delete state.skip;
        delete state.take;

        return this.fetch();
    }
}
