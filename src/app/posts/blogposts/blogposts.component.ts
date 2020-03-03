import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Rellax from 'rellax';
import {PostModel} from '../../../../backend/models/post.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../user/auth.service';
import {PostService} from '../post.service';
import {first} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-blogposts',
  templateUrl: './blogposts.component.html',
  styleUrls: ['./blogposts.component.scss']
})
export class BlogpostsComponent implements OnInit, OnDestroy {
  // posts: [PostModel];
  posts$: Observable<[PostModel]>;
  post_length: number;
  focus;

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      private postService: PostService,
      // private alertService: AlertService
  ) {
      this.posts$ = this.postService.getPostList();
      this.posts$
          .pipe(first())
          .subscribe(
              res => {
                this.post_length = res.length;
              }
          );
  }

  ngOnInit() {
    // const rellaxHeader = new Rellax('.rellax-header');
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('blog-posts');
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('blog-posts');
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');

  }

}
