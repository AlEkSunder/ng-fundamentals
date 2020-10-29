import { Component, Input } from "@angular/core";

@Component({
    selector: 'collapsible-well',
    templateUrl: './collapsible-well.component.html',
    styleUrls: ['./collapsible-well.component.css']
})

export class CollapsibleWellComponent {
    @Input() title: string;
    isVisible: boolean = true;

    toggleContent() {
        this.isVisible = !this.isVisible
    }
}