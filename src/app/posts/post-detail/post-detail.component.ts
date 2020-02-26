import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Rellax from 'rellax';
import {PostService} from '../post.service';
import {PostModel} from '../../../../backend/models/post.model';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {UserModel} from '../../../../backend/models/user.model';
import {AuthService} from '../../user/auth.service';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {
    post: PostModel;
    author: UserModel;
    owner: boolean;
    focus;

    constructor(
        private postService: PostService,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        const rellaxHeader = new Rellax('.rellax-header');
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('blog-post');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        this.owner = false;
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.postService.getMyPost(id)
            .pipe(first())
            .subscribe(
                res => {
                    this.owner = true;
                    this.post = res;
                    this.authService.getUser(this.post.author)
                        .pipe(first())
                        .subscribe(
                            res2 => {
                                this.author = res2;
                            }
                        )
                }, error => {
                    this.postService.getPost(id)
                        .pipe(first())
                        .subscribe(
                            res => {
                                this.post = res;
                                this.authService.getUser(this.post.author)
                                    .pipe(first())
                                    .subscribe(
                                        res2 => {
                                            this.author = res2;
                                        }
                                    )
                            },
                            error2 => {
                                window.alert('Access not allowed or post does not exist!');
                                this.router.navigate(['/blog'])
                            }
                        );
                }
            );
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('blog-post');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
}
