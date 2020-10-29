import { Component } from "@angular/core";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login.component.html',
    styles: [`
        em { float: right; color: #E05C65; padding-left: 10px }
    `]
})

export class LoginComponent {
    userName: string;
    password: string;
    mouseoverLogin: boolean;
    loginInvalid: boolean = false;

    constructor(private authService: AuthService, private router: Router) {
    }

    login(formValues) {
        this.authService.loginUser(formValues.userName, formValues.password)
            .subscribe(response => {
                if (response)
                    this.router.navigate(['events']);
                else
                    this.loginInvalid = true;
            });

    }
    cancel() {
        this.router.navigate(['events'])
    }
}