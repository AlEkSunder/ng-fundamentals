import { Component, Input } from "@angular/core";
import { IEvent } from '.';

@Component({
    selector: 'event-thumbnail',
    templateUrl: 'event-thumbnail.component.html',
    styleUrls: ['event-thumbnail.component.css']
})

export class EventThumbnailComponent {
    @Input() event: IEvent

    logFoo() {
        console.log('foo')
    }

    getStartTimeClass() {
        let isMatch = this.event && this.event.time === '8:00 am'
        // return ['green', 'bold']
        // return []
        // return 'green bold'
        // return ''
        return { green: isMatch, bold: isMatch };
    }

    getStartTimeStyle():any {
        if (this.event && this.event.time === '8:00 am')
            return { color: '#003000', 'font-weight': 'bold' };
            return {}
    }


}