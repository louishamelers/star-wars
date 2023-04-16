import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PeopleState, PlanetsState } from '../state';
import { updateRequestStatus } from '@ngneat/elf-requests';
import { upsertEntities } from '@ngneat/elf-entities';
import { setPage, updatePaginationData } from '@ngneat/elf-pagination';
import { MODELS } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  constructor(private httpClient: HttpClient) {}

  getPlanets(page: number = 1): void {
    PlanetsState.planetsStore.update(
      updateRequestStatus('getPlanets', 'pending')
    );
    this.httpClient
      .get(
        `${environment.swapi.apiUrl}${environment.swapi.planetsEndpoint}?page=${page}`
      )
      .subscribe({
        next: (res: any) => {
          const planets: MODELS.Planet[] = res.results.map((person: any) => ({
            ...person,
            id: person.url.match(/\d+/)[0],
          }));

          PlanetsState.planetsStore.update(
            updateRequestStatus('getPlanets', 'success'),
            upsertEntities(planets),
            updatePaginationData({
              total: res.count,
              perPage: planets.length,
              lastPage: Math.ceil(res.count / planets.length),
              currentPage: page,
            }),
            setPage(
              page,
              planets.map((planet) => planet.id)
            )
          );
        },
        error: (err) => {
          PlanetsState.planetsStore.update(
            updateRequestStatus('getPlanets', 'error', err)
          );
        },
        complete: () => {
          PlanetsState.planetsStore.update(
            updateRequestStatus('getPlanets', 'idle')
          );
        },
      });
  }

  getPlanet(id: string): void {
    PlanetsState.planetsStore.update(
      updateRequestStatus('getPerson', 'pending')
    );
    this.httpClient
      .get(
        `${environment.swapi.apiUrl}${environment.swapi.planetsEndpoint}${id}`
      )
      .subscribe({
        next: (res: any) => {
          const person = {
            ...res,
            id: res.url.match(/\d+/)[0],
          };

          PlanetsState.planetsStore.update(
            updateRequestStatus('getPerson', 'success'),
            upsertEntities(person)
          );
        },
        error: (err) => {
          PlanetsState.planetsStore.update(
            updateRequestStatus('getPerson', 'error', err)
          );
        },
        complete: () => {
          PlanetsState.planetsStore.update(
            updateRequestStatus('getPerson', 'idle')
          );
        },
      });
  }

  getPeople(page: number = 1): void {
    PeopleState.peopleStore.update(updateRequestStatus('getPeople', 'pending'));
    this.httpClient
      .get(
        `${environment.swapi.apiUrl}${environment.swapi.peopleEndpoint}?page=${page}`
      )
      .subscribe({
        next: (res: any) => {
          const people: MODELS.Person[] = res.results.map((person: any) => ({
            ...person,
            id: person.url.match(/\d+/)[0],
          }));

          PeopleState.peopleStore.update(
            updateRequestStatus('getPeople', 'success'),
            upsertEntities(people),
            updatePaginationData({
              total: res.count,
              perPage: people.length,
              lastPage: Math.ceil(res.count / people.length),
              currentPage: page,
            }),
            setPage(
              page,
              people.map((person) => person.id)
            )
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
