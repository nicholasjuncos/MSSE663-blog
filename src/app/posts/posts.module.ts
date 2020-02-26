import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostsRoutingModule} from './posts.routing';
import {PostsComponent} from './posts.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ImageUploadModule} from '../shared/image-upload/image-upload.module';
import {PostCardComponent} from './post-card/post-card.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {PostListComponent} from './post-list/post-list.component';
import {PostFormComponent} from './post-form/post-form.component';
import {BlogpostsComponent} from './blogposts/blogposts.component';
import {FooterModule} from '../shared/footer/footer.module';

@NgModule({
    declarations: [PostsComponent, PostCardComponent, PostDetailComponent, PostListComponent, PostFormComponent, BlogpostsComponent],
    imports: [
        CommonModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule,
        PostsRoutingModule,
        ImageUploadModule,
        FooterModule
    ],
    exports: [
        PostCardComponent,
        PostListComponent
    ]
})
export class PostsModule {
}
