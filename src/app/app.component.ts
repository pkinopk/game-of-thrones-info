import { Component, OnInit } from '@angular/core';
import { WikiControlService } from './wiki-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WikiControlService]
})
export class AppComponent implements OnInit {
  title = 'game-of-thrones-wiki';

  constructor(public service: WikiControlService) {}

  ngOnInit() {
    this.service.onStart();
  }
}
