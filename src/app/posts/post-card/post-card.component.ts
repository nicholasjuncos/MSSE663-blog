import { Component, Input, OnInit } from '@angular/core';
import {PostModel} from '../../../../backend/models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post: PostModel;

  constructor() { }

  ngOnInit() {
  }

}
