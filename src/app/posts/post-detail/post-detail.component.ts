import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Rellax from 'rellax';
import {PostService} from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  data: Date = new Date();
  focus;

  constructor(private postService: PostService) { }

  ngOnInit() {
    const rellaxHeader = new Rellax('.rellax-header');
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('blog-post');
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('blog-post');
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
}
