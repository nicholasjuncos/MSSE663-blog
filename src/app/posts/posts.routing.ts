import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {BlogpostsComponent} from './blogposts/blogposts.component';
import {PostFormComponent} from './post-form/post-form.component';

export const routes: Routes = [
    { path: 'blog',       component: BlogpostsComponent },
    { path: 'blog/create',       component: PostFormComponent },
    { path: 'blog/update/:id',       component: PostFormComponent },
    { path: 'blog/:id',       component: PostDetailComponent },
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
