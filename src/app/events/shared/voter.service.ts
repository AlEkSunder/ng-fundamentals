import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/user/auth.service';
import { ISession } from './event.model';

@Injectable()
export class VoterService {

    constructor(private authService: AuthService, private http: HttpClient) { }
    deleteVote(session: ISession, eventId: number) {
        let voterMan = this.authService.currentUser.userName;
        let sessionId = session.id;
        session.voters = session.voters.filter(voter => voter !== this.authService.currentUser.userName);

        const url = `/api/events/${eventId}/sessions/${sessionId}/voters/${voterMan}`;
        this.http.delete(url)
            .pipe(catchError(this.handleError('deleteVote')))
            .subscribe();
    }

    addVote(session: ISession, eventId: number) {
        let voterMan = this.authService.currentUser.userName;
        let sessionId = session.id;
        session.voters.push(voterMan);

        const url = `/api/events/${eventId}/sessions/${sessionId}/voters/${voterMan}`;
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
        this.http.post(url, {}, options)
            .pipe(catchError(this.handleError('addVote')))
            .subscribe();
    }

    isUserVoted(session: ISession): boolean {
        return session.voters.some(voter => voter === this.authService.currentUser.userName);
    }

    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log(error);
            return of(result as T);
        }
    }
}