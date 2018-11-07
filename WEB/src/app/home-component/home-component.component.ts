import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-component',
  template: `<router-outlet></router-outlet> `
})
export class HomeComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
