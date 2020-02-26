import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../../../../backend/models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() posts: [PostModel];
  @Input() post_length: number;

  constructor() { }

  ngOnInit() {
  }

}
