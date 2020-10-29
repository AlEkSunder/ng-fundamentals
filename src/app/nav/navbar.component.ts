import { Component, OnInit } from '@angular/core';
import { EventService, IEvent, ISession } from '../events';
import { AuthService } from '../user/auth.service';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent implements OnInit {
    searchTerm: string = "";
    foundSessions: ISession[];
    events: IEvent[];

    constructor(private authService: AuthService, private eventService: EventService) { }

    isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }

    ngOnInit(): void {
        this.eventService.getEvents()
            .subscribe((data) => {
                this.events = data;
            })
    }

    searchSessions(searchTerm: string) {
        this.eventService.searchSessions(searchTerm)
            .subscribe(sessions => {
                this.foundSessions = sessions;
            });
    }
}
