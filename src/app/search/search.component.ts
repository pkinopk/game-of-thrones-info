import { Component, OnInit } from '@angular/core';
import { WikiControlService } from '../wiki-control.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(public service: WikiControlService) {}

  charactersList = this.service.charactersList;

  ngOnInit() {}
}
