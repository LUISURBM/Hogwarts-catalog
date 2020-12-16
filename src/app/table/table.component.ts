import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { PersonajeData } from '../personajes/personajes.component';
import { DataService } from './data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'patronus', 'image', 'age'];

  dataSource: BehaviorSubject<MatTableDataSource<PersonajeData>>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(public httpClient: HttpClient
    , public dataService: DataService
  ) {
    this.dataService.personajesData.subscribe(ds => {
      let matDS = new MatTableDataSource(ds);
      matDS.paginator = this.paginator;
      matDS.sort = this.sort;
      this.dataSource = new BehaviorSubject(matDS);
    })
  }


  ngOnInit() {
    let matDS = new MatTableDataSource(this.dataService.getPersonajes());
    matDS.paginator = this.paginator;
    matDS.sort = this.sort;
    this.dataSource = new BehaviorSubject(matDS);
  }

  ngAfterViewInit() {
    let matDS = this.dataSource.value;
    matDS.paginator = this.paginator;
    matDS.sort = this.sort;
    this.dataSource.next(matDS);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let matDS = this.dataSource.value;
    matDS.filter = filterValue.trim().toLowerCase();
    this.dataSource.next(matDS);

    if (this.dataSource.value.paginator) {
      this.dataSource.value.paginator.firstPage();
    }

  }

  calcularEdad(value: number) {
    return value ? new Date().getFullYear() - value : 'Unknown';
  }

}
