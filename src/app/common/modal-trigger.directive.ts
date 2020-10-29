import { Directive, ElementRef, Inject, Input, OnInit } from '@angular/core'
import { JQ_TOKEN } from './jQuery.service';

@Directive({
    selector: '[modal-trigger]'
})

export class ModalTriggerDirective implements OnInit {
    private element: HTMLElement;
    @Input('modal-trigger') modalId: string;

    constructor(private ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
        this.element = ref.nativeElement;
    }

    ngOnInit(): void {

        this.element.addEventListener('click', event => {
            this.$(`#${this.modalId}`).modal({});
        })
    }

}