import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../../../../../backend/models/post.model';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent implements OnInit {
  @Input() posts: [PostModel];
  @Input() post_length: number;

  constructor() { }

  ngOnInit() {
  }

}
