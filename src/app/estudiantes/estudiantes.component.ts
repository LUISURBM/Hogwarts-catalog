import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { DataService } from '../table/data.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss']
})
export class EstudiantesComponent implements OnInit, AfterViewInit {

  estudentForm = this.fb.group({
    name: ['', Validators.required],
    patronus: [''],
    age: [''],
    image: [''],
    yearOfBirth: ['']
  });

  constructor(public httpClient: HttpClient
    , private fb: FormBuilder
    , public dataService: DataService
  ) { }


  ngOnInit() {
    this.httpClient.get(`http://hp-api.herokuapp.com/api/characters/students`).pipe(
      take(1),
      tap((response: any) => {
        this.dataService.initPersonaje(response);
      })
    ).subscribe();
  }

  ngAfterViewInit() {
  }

  onSubmit() {
    const yearOfBirth = 2020 - this.estudentForm.value.age;
    this.estudentForm.patchValue({ yearOfBirth: yearOfBirth });
    this.dataService.createPersonaje(this.estudentForm.value)
  }
}
