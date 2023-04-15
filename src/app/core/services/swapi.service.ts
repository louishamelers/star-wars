import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  getPlanet(id: number): Observable<any> {
    return this.httpClient.get(
      `${environment.swapi.apiUrl}${environment.swapi.planetsEndpoint}${id}`
    );
  }

  getPeople(page: number = 1): Observable<any> {
    return this.httpClient.get(
      `${environment.swapi.apiUrl}${environment.swapi.peopleEndpoint}?page=${page}`
    );
  }

  getPerson(id: number): Observable<any> {
    return this.httpClient.get(
      `${environment.swapi.apiUrl}${environment.swapi.peopleEndpoint}${id}`
    );
  }
}
