import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonajeData } from '../personajes/personajes.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public personajesData: BehaviorSubject<PersonajeData[]>;

  constructor() {
    this.personajesData = new BehaviorSubject([]);
  }

  public getPersonajes(): Array<PersonajeData> {
    return this.personajesData.value;
  }
  public createPersonaje(contact: PersonajeData) {
    let data = this.personajesData.value;
    data.push(contact);
    this.personajesData.next(data);
  }
  public initPersonaje(contacts: PersonajeData[]) {
    this.personajesData.next(contacts);
  }
}