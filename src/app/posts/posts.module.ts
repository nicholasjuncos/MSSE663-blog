import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts.routing';
import { PostsComponent } from './posts.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ImageUploadModule} from '../shared/image-upload/image-upload.module';

@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    PostsRoutingModule,
    ImageUploadModule
  ],
  // exports: [
  //   PostsComponent
  // ]
})
export class PostsModule { }
