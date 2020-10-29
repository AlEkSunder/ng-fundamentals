import { Component, OnInit } from '@angular/core';
import { IEvent } from './events';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'events-app',
  template: `
  <nav-bar></nav-bar>
  <router-outlet></router-outlet>
  `
})
export class EventsAppComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkAuthStatus();
  }
}
