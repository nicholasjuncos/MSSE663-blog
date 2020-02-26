import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Rellax from 'rellax';
import {PostService} from '../post.service';
import {PostModel} from '../../../../backend/models/post.model';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {UserModel} from '../../../../backend/models/user.model';
import {AuthService} from '../../user/auth.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {
    BACKEND_URL: string = environment.backendUrl;
    post$: Observable<PostModel>;
    author$: Observable<UserModel>;
    owner: boolean;
    focus;
    coverImg: string;
    img1: string;
    img2: string;
    img3: string;
    authorImg: string;

    constructor(
        private postService: PostService,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.owner = false;
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.getPost(id);
        // const rellaxHeader = new Rellax('.rellax-header');
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('blog-post');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }

    getPost(id: string) {
        this.post$ = this.postService.getMyPost(id);
        this.post$.pipe(first()).subscribe(
            res => {
                this.owner = true;
                this.coverImg = res.coverImg ? this.BACKEND_URL + '/' + res.coverImg.imageURL : '../../../assets/img/image_placeholder.jpg';
                this.img1 = res.img1 ? this.BACKEND_URL + '/' + res.img1.imageURL : null;
                this.img2 = res.img2 ? this.BACKEND_URL + '/' + res.img2.imageURL : null;
                this.img3 = res.img3 ? this.BACKEND_URL + '/' + res.img3.imageURL : null;
                this.author$ = this.authService.getUser(res.author);
                this.author$.pipe(first())
                    .subscribe(
                        res2 => {
                            this.authorImg = res2.img ? this.BACKEND_URL + '/' + res2.img.imageURL : '../../../assets/img/placeholder.jpg';
                        }
                    )
            }, error => {
                this.post$ = this.postService.getPost(id);
                this.post$.pipe(first())
                    .subscribe(
                        res => {
                            this.owner = false;
                            this.coverImg = res.coverImg ? this.BACKEND_URL + '/' + res.coverImg.imageURL : '../../../assets/img/image_placeholder.jpg';
                            this.img1 = res.img1 ? this.BACKEND_URL + '/' + res.img1.imageURL : null;
                            this.img2 = res.img2 ? this.BACKEND_URL + '/' + res.img2.imageURL : null;
                            this.img3 = res.img3 ? this.BACKEND_URL + '/' + res.img3.imageURL : null;
                            this.author$ = this.authService.getUser(res.author);
                            this.author$.pipe(first())
                                .subscribe(
                                    res2 => {
                                        this.authorImg = res2.img ? this.BACKEND_URL + '/' + res2.img.imageURL : '../../../assets/img/placeholder.jpg';
                                    }
                                )
                        },
                        error2 => {
                            window.alert('Access not allowed or post does not exist!');
                            this.router.navigate(['/blog'])
                        }
                    );
            }
        )
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('blog-post');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
}
