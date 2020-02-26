import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { UserRoutingModule } from './user.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ImageUploadModule} from '../shared/image-upload/image-upload.module';
import { EditUserComponent } from './profile/edit-user/edit-user.component';
import { DetailsUserComponent } from './profile/details-user/details-user.component';
import {PostsModule} from '../posts/posts.module';
import {FooterModule} from '../shared/footer/footer.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent, EditUserComponent, DetailsUserComponent],
    imports: [
        CommonModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule,
        UserRoutingModule,
        ImageUploadModule,
        PostsModule,
        FooterModule
    ],
    exports: [
        LoginComponent
    ]
})
export class UserModule { }
