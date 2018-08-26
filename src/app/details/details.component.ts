import { Component, OnInit } from '@angular/core';
import { WikiControlService } from '../wiki-control.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(public service: WikiControlService) {}

  ngOnInit() {}
}
