import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import {AuthGuard} from '../user/auth.guard';

export const routes: Routes = [
    // { path: 'login',       component: LoginComponent },
    // { path: 'register',    component: RegisterComponent },
    // {
    //     path: 'profile',
    //     component: ProfileComponent,
    //     canActivate: [AuthGuard],
    // }

];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PostsRoutingModule { }
