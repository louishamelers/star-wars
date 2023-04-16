import { Component, OnInit } from '@angular/core';
import { SwapiService } from 'src/app/core/services/swapi.service';
import { PeopleState } from 'src/app/core/state';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  people$ = PeopleState.people$;

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.swapiService.getPeople();
  }
}
