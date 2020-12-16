import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { DataService } from '../table/data.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {


  constructor(public httpClient: HttpClient
    , public dataService: DataService
  ) { }

  ngOnInit() {
    this.httpClient.get(`http://hp-api.herokuapp.com/api/characters/staff`).pipe(
      take(1),
      tap((response: any) => {
        this.dataService.initPersonaje(response);
      })
    ).subscribe();
  }

  calcularEdad(value: number) {
    return new Date().getFullYear() - value;
  }
}
