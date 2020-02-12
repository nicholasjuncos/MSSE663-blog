import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { UserRoutingModule } from './user.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogoutComponent, ProfileComponent],
    imports: [
        CommonModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule,
        UserRoutingModule
    ],
    exports: [
        LoginComponent
    ]
})
export class UserModule { }
