import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { AuthService } from 'src/app/user/auth.service';
import { ISession, VoterService } from '../shared';

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html',
    styleUrls: ['./session-list.component.css']
})

export class SessionListComponent implements OnChanges, OnInit {
    @Input() sessions: ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    @Input() eventId: number;
    filteredSessions: ISession[] = [];
    isAuthenticated: boolean;

    constructor(private voterService: VoterService, private authService: AuthService) { }

    ngOnInit() {
        this.isAuthenticated = this.authService.isAuthenticated();
    }

    ngOnChanges() {
        if (!this.sessions)
            return;

        this.filterSessions();
        this.sortSessions();
    }

    filterSessions() {
        if (this.filterBy === 'all')
            this.filteredSessions = this.sessions.slice(0);
        else
            this.filteredSessions = this.sessions.filter(session => session.level.toLowerCase() === this.filterBy)
    }

    sortSessions() {
        if (this.sortBy === 'name')
            this.filteredSessions.sort(this.sortByNameAsc);
        else
            this.filteredSessions.sort(this.sortByVotesDesc);
    }

    sortByNameAsc(session1: ISession, session2: ISession): number {
        if (session1.name > session2.name) return 1;
        else if (session1.name === session2.name) return 0;
        else return -1;
    }

    sortByVotesDesc(session1: ISession, session2: ISession): number {
        return session2.voters.length - session1.voters.length
    }

    toggleVote(session: ISession) {
        if (this.isUserVoted(session))
            this.voterService.deleteVote(session, this.eventId);
        else
            this.voterService.addVote(session, this.eventId);
    }

    isUserVoted(session: ISession): boolean {
        return this.voterService.isUserVoted(session);
    }
}