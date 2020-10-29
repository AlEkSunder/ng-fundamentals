import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ISession } from '../shared';

@Component({
    selector: 'upvote',
    templateUrl: './upvote.component.html',
    styleUrls: ['./upvote.component.css']
})
export class UpvoteComponent {
    @Input() count: number;
    @Input() set isVoted(value: boolean) {
        this.iconColor = value ? "red" : "white";
    }
    @Output() vote = new EventEmitter();
    iconColor: string;

    onClick() {
        this.vote.emit("");
    }
}