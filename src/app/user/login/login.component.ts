import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    data: Date = new Date();
  loginForm: FormGroup;
  focus;
  focus1;
  returnUrl: string;

  constructor(
    public formBuilder: FormBuilder,
    public auth: AuthService,
    public router: Router,
    private route: ActivatedRoute,
  ) {
    if (this.auth.isLoggedIn) {
    this.router.navigate(['/']);
    }
  }

    ngOnInit() {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('login-page');
      const navbar = document.getElementsByTagName('nav')[0];
      navbar.classList.add('navbar-transparent');

      this.loginForm = this.formBuilder.group( {
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

   ngOnDestroy() {
       const body = document.getElementsByTagName('body')[0];
       body.classList.remove('login-page');
       const navbar = document.getElementsByTagName('nav')[0];
       navbar.classList.remove('navbar-transparent');
     }

  loginUser() {
    this.auth.login(this.loginForm.value)
  }
}
