import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { DataService } from '../table/data.service';

export interface Wand {
  wood: string;
  core: string;
  length: number;
}

export interface PersonajeData {
  name: string;
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  yearOfBirth: number;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: Wand;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alive: boolean;
  image: string;
}



@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonajesComponent implements OnInit, AfterViewInit {

  casas = ["Slytherin", "Gryffindor", " Ravenclaw", "Hufflepuff"];
  casa: string;

  set selected(value: string) { this.validateCasa(value); };
  get selected() { return this.casa; }


  constructor(public httpClient: HttpClient
    , public dataService: DataService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  validateCasa(value: string) {
    this.casa = value;
    this.httpClient.get(`http://hp-api.herokuapp.com/api/characters/house/${this.casa}`).pipe(
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
