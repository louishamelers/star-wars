import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PeopleState } from '../state';
import { updateRequestStatus } from '@ngneat/elf-requests';
import { upsertEntities } from '@ngneat/elf-entities';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  constructor(private httpClient: HttpClient) {}

  getPlanets(page: number = 1): Observable<any> {
    return this.httpClient.get(
      `${environment.swapi.apiUrl}${environment.swapi.planetsEndpoint}?page=${page}`
    );
  }

  getPlanet(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.swapi.apiUrl}${environment.swapi.planetsEndpoint}${id}`
    );
  }

  getPeople(page: number = 1): void {
    PeopleState.peopleStore.update(updateRequestStatus('getPeople', 'pending'));
    this.httpClient
      .get(
        `${environment.swapi.apiUrl}${environment.swapi.peopleEndpoint}?page=${page}`
      )
      .subscribe({
        next: (res: any) => {
          const people = res.results.map((person: any) => ({
            ...person,
            id: person.url.match(/\d+/)[0],
          }));

          PeopleState.peopleStore.update(
            updateRequestStatus('getPeople', 'success'),
            upsertEntities(people)
          );
        },
        error: (err) => {
          PeopleState.peopleStore.update(
            updateRequestStatus('getPeople', 'error', err)
          );
        },
        complete: () => {
          PeopleState.peopleStore.update(
            updateRequestStatus('getPeople', 'idle')
          );
        },
      });
  }

  getPerson(id: string): void {
    PeopleState.peopleStore.update(updateRequestStatus('getPerson', 'pending'));
    this.httpClient
      .get(
        `${environment.swapi.apiUrl}${environment.swapi.peopleEndpoint}${id}`
      )
      .subscribe({
        next: (res: any) => {
          const person = {
            ...res,
            id: res.url.match(/\d+/)[0],
          };

          PeopleState.peopleStore.update(
            updateRequestStatus('getPerson', 'success'),
            upsertEntities(person)
          );
        },
        error: (err) => {
          PeopleState.peopleStore.update(
            updateRequestStatus('getPerson', 'error', err)
          );
        },
        complete: () => {
          PeopleState.peopleStore.update(
            updateRequestStatus('getPerson', 'idle')
          );
        },
      });
  }
}
