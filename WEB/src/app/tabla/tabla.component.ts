import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { TablaDataSource } from './tabla-datasource';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TablaDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','tipo'];
  carreras=[{id:1,name:'calculo'},
    {id:2,name:'calculo 2'},
    {id:3,name:'calculo 3'}
];

  ngOnInit() {
    this.dataSource = new TablaDataSource(this.paginator, this.sort);
  }
}
