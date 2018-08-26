import { Component, OnInit } from '@angular/core';
import { WikiControlService } from '../wiki-control.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {
  constructor(public service: WikiControlService) {}

  ngOnInit() {}
}
