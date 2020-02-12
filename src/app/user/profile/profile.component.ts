import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { first } from 'rxjs/operators';
import * as Rellax from 'rellax';

import {PasswordValidation} from '../../shared/validators';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  updateUserForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  data: Date = new Date();
  focus;
  focus1;

  constructor(
      public formBuilder: FormBuilder,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      // private alertService: AlertService
  ) {
  }

  ngOnInit() {
    const rellaxHeader = new Rellax('.rellax-header');
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    this.updateUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/profile';
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  get f() { return this.updateUserForm.controls; }

  updateUser() {
    this.submitted = true;
    if (this.updateUserForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.update(this.f.firstName.value, this.f.lastName.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              window.alert('Successfully updated user!');
              window.location.reload();
            },
            error => {
              this.error = error;
              this.loading = false;
            }
        );
  }
}
