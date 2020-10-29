import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventsListResolver,
  CreateSessionComponent,
  RestrictedWordsValidator,
  SessionListComponent,
  DurationPipe, UpvoteComponent, VoterService, LocationValidator, EventResolver
} from './events/index'

import { EventsAppComponent } from './events-app.component';
import { NavbarComponent } from './nav/navbar.component';
import { } from './common/toastr.service';
import {
  TOASTR_TOKEN,
  JQ_TOKEN,
  Toastr,
  CollapsibleWellComponent,
  SimpleModalComponent,
  ModalTriggerDirective
} from './common'
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';
import { Error404Component } from './errors/error404.component';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let toastr: Toastr = window['toastr'];
let jQuery: Object = window['$'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    NavbarComponent,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    UpvoteComponent,
    ModalTriggerDirective,
    LocationValidator
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
    EventResolver,    
    EventsListResolver,
    AuthService,
    RestrictedWordsValidator,
    VoterService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkChangedState
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkChangedState(component: CreateEventComponent) {
  if (component.isChanged)
    return window.confirm('You have not saved this event. Do you really want to cancel?')

  return true;
}