import { Component, OnInit, Inject } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service'

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup
  firstName: FormControl
  lastName: FormControl

  constructor(private authService: AuthService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr) {

  }

  ngOnInit(): void {
    this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')])
    this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required)
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  cancel(): void {
    this.router.navigate(['events'])
  }

  saveProfile(formValues): void {
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
        .subscribe(() => {
          this.showToastrUpdates();
        })
      this.router.navigate(['events'])
    }
  }

  logout() {
    this.authService.logout()
      .subscribe(() => {
        this.router.navigate(['/user/login'])
      });

  }

  showToastrUpdates() {
    if (this.firstName.dirty)
      this.toastr.success("The first name was changed to '" + this.firstName.value + "'");
    if (this.lastName.dirty)
      this.toastr.success("The last name was changed to '" + this.lastName.value + "'");
  }

  isValidFirstName(): boolean {
    return this.firstName.valid || this.firstName.untouched
  }

  isValidLastName(): boolean {
    return this.lastName.valid || this.lastName.untouched
  }

  isValidRequiredFirstName(): boolean {
    return !this.isValidFirstName()
      && this.firstName.errors.required
  }

  isValidRequiredLastName(): boolean {
    return !this.isValidLastName()
      && this.lastName.errors.required
  }

  isValidPatternFirstName(): boolean {
    return !this.isValidFirstName()
      && this.firstName.errors.pattern
  }

  isValidPatternLastName(): boolean {
    return !this.isValidLastName()
      && this.lastName.errors.pattern
  }
}