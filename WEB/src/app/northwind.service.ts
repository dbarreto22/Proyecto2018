import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';

export abstract class NorthwindService extends BehaviorSubject<GridDataResult> {
    public loading: boolean;

    private BASE_URL = 'http://b0b9853a.ngrok.io/miudelar-server/';

    constructor(
        private http: HttpClient,
        protected tableName: string
    ) {
        super(null);
    }

    public query(): void {
        this.fetch(this.tableName)
            .subscribe(x => super.next(x));
    }

    protected fetch(tableName: string): Observable<GridDataResult> {
        this.loading = true;

        return this.http
            .get(`${this.BASE_URL}${tableName}`)
            .pipe(
                map((carrera, index )=> (<GridDataResult>{
                    data: carrera,
                    total: index
                })),
                tap(() => this.loading = false)
            );
    }
}

@Injectable()
export class CarrerasService extends NorthwindService {
    constructor(http: HttpClient) { super(http, 'director/carrera/'); }

    queryAll(st?: any): Observable<GridDataResult> {
        return this.fetch(this.tableName);
    }
}
