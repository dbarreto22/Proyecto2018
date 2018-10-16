import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TablaItem {
  tipo: string;
  name: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TablaItem[] = [
  {id: 1, name: 'Calculo 1', tipo: 'Examen'},
  {id: 2, name: 'Calculo 2', tipo: 'Curso'},
  {id: 3, name: 'Fisica 1', tipo: 'Curso'},
  {id: 4, name: 'Gal 1', tipo: 'Curso'},
  {id: 5, name: 'Sistemas Operativos 2', tipo: 'Examen'},
  {id: 6, name: 'Infraestructuras', tipo: 'Curso'},
  {id: 7, name: 'Matematica Discreta 1', tipo: 'Examen'},
  {id: 8, name: 'Logica 1', tipo: 'Examen'},
  {id: 9, name: 'Matematica discreta 2', tipo: 'Curso'},
  {id: 10, name: 'Gal 2', tipo: 'Examen'},
  {id: 11, name: 'Caluclo 3', tipo: 'Curso'},
  {id: 12, name: 'Ecuaciones diferenciales', tipo: 'Examen'},
  {id: 13, name: 'Programacion 1', tipo: 'Examen'},
  {id: 14, name: 'Programacion 2', tipo: 'Examen'},
  {id: 15, name: 'Programacion 4', tipo: 'Curso'},
  {id: 16, name: 'Sistemas operativos', tipo: 'Curso'},
  {id: 17, name: 'Programacion 3', tipo: 'Examen'},
  {id: 18, name: 'Proyecto', tipo: 'Examen'},
  {id: 19, name: 'Taller de informacion geografica', tipo: 'Curso'},
  {id: 20, name: 'Competencias roboticas', tipo: 'Examen'},
];

/**
 * Data source for the Tabla view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TablaDataSource extends DataSource<TablaItem> {
  data: TablaItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TablaItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TablaItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TablaItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
 /* applyFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }*/

}

/** Simple sort comparator for example ID/name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

