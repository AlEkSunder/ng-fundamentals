import { Component, ElementRef, Inject, Input, ViewChild } from "@angular/core";
import { $ } from 'protractor';
import { JQ_TOKEN } from './jQuery.service';

@Component({
    selector: 'simple-modal',
    templateUrl: './simple-modal.component.html',
    styleUrls: ['./simple-modal.component.css']
})

export class SimpleModalComponent {
    @Input() title: string;
    @Input() elementId: string;
    @Input() closeOnBodyClick: string;

    @ViewChild('modalContainer') modalElement: ElementRef;

    constructor(@Inject(JQ_TOKEN) private $: any) { }

    onClicked() {
        if (this.closeOnBodyClick.toLocaleLowerCase() === "true")
            this.$(this.modalElement.nativeElement).modal('hide');
    }
}