import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ISession, RestrictedWordsValidator } from '../shared';
import { Router } from '@angular/router';

@Component({
    selector: 'create-session',
    templateUrl: './create-session.component.html',
    styleUrls: ['./create-session.component.css']
})

export class CreateSessionComponent implements OnInit {
    @Output() saveNewSession = new EventEmitter()
    @Output() cancelAddSession = new EventEmitter()
    newSessionForm: FormGroup
    name: FormControl
    presenter: FormControl
    duration: FormControl
    level: FormControl
    abstract: FormControl

    constructor(private router: Router, private validator: RestrictedWordsValidator) { }

    ngOnInit(): void {
        this.name = new FormControl('', Validators.required)
        this.presenter = new FormControl('', Validators.required)
        this.duration = new FormControl('', Validators.required)
        this.level = new FormControl('', Validators.required)
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), this.validator.restrictedWords(['foo', 'bar'])])

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract,
        })
    }

    saveSession(formValues) {
        let session: ISession = {
            abstract: formValues.abstract,
            duration: +formValues.duration,
            id: undefined,
            eventId: 0,
            level: formValues.level,
            name: formValues.name,
            presenter: formValues.presenter,
            voters: []
        }
        this.saveNewSession.emit(session)
    }

    cancel(): void {
        this.cancelAddSession.emit()
    }
} 