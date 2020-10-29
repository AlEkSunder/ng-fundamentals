import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { IEvent, EventService } from './shared';

@Component({
    selector: '',
    templateUrl: 'create-event.component.html',
    styleUrls: ['create-event.component.css']
})
export class CreateEventComponent {
    newEvent: IEvent;
    isChanged: boolean = true;

    constructor(private router: Router, private eventService: EventService) {
    }

    onCancelClick() {
        this.router.navigate(['/events'])
    }

    saveEvent(formValues) {
        this.eventService.saveEvent(formValues).subscribe(() => {
            this.isChanged = false
            this.router.navigate(['/events'])
        });
    }
}