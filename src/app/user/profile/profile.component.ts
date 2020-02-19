import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import * as Rellax from 'rellax';

import {PasswordValidation} from '../../shared/validators';
import {AuthService} from '../auth.service';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    loading = false;
    returnUrl: string;
    userSubmitted = false;
    userError: string;
    passSubmitted = false;
    passError: string;
    imgSubmitted = false;
    imgError: string;
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
        this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/profile';
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('profile-page');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    updateUser(updateUserForm: FormGroup) {
        this.userSubmitted = true;
        if (updateUserForm.invalid) {
            return;
        }
        this.loading = true;
        this.authService.updateUser(updateUserForm.get('firstName').value, updateUserForm.get('lastName').value)
            .pipe(first())
            .subscribe(
                data => {
                    window.alert('Successfully updated user information!');
                    window.location.reload();
                },
                error => {
                    this.userError = error;
                    this.loading = false;
                }
            );
    }

    updatePassword(updatePasswordForm: FormGroup) {
        this.passSubmitted = true;
        if (updatePasswordForm.invalid) {
            return;
        }
        this.loading = true;
        this.authService.updatePassword(updatePasswordForm.get('password').value)
            .pipe(first())
            .subscribe(
                data => {
                    window.alert('Successfully updated user password!');
                    window.location.reload();
                },
                error => {
                    this.passError = error;
                    this.loading = false;
                }
            );
    }

    updateImg(updateImgForm: FormGroup) {
        this.imgSubmitted = true;
        if (updateImgForm.invalid) {
            return;
        }
        this.loading = true;
        this.authService.updateImg(updateImgForm.get('img').value)
            .pipe(first())
            .subscribe(
                data => {
                    window.alert('Successfully updated user image!');
                    window.location.reload();
                },
                error => {
                    this.imgError = error;
                    this.loading = false;
                }
            );
    }
}
