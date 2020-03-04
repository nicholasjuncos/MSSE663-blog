import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthService} from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    data: Date = new Date();
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error: string;
    focus;
    focus1;
    returnUrl: string;

    constructor(
        public formBuilder: FormBuilder,
        public authService: AuthService,
        public router: Router,
        private route: ActivatedRoute,
        // private alertService: AlertService
    ) {
        if (this.authService.isLoggedIn()) {
            // TODO: CHANGE WINDOW.ALERT() TO AN ALERT SERVICE
            window.alert('Already Logged in!');
            this.router.navigate(['/profile']);
        }
    }

    ngOnInit() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        const footer = document.getElementsByTagName('footer')[0];
        footer.classList.remove('footer-default');

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        const footer = document.getElementsByTagName('footer')[0];
        footer.classList.add('footer-default');
    }

    get f() { return this.loginForm.controls; }

    loginUser() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    window.alert('Successfully Logged in!');
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }
}
