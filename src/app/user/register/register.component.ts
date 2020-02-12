import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthService} from '../auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: string;
    focus;
    focus1;
    focus2;
    focus3;
    data: Date = new Date();

    constructor(
        public formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        // private alertService: AlertService
    ) {
        if (this.authService.isLoggedIn()) {
            // TODO: CHANGE WINDOW.ALERT() TO AN ALERT SERVICE
            window.alert('Already Logged in!');
            this.router.navigate(this.route.snapshot.queryParams.returnUrl || '/profile');
        }
    }

    ngOnInit() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('signup-page');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-absolute');
        navbar.classList.remove('fixed-top');

        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/profile';
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('signup-page');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-absolute');
        navbar.classList.add('fixed-top');
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    register() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;
        this.authService.register(this.f.firstName.value, this.f.lastName.value, this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    window.alert('Successfully registered and logged in!');
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }

}
