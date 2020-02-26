import { Component, Input, OnInit } from '@angular/core';
import {PostModel} from '../../../../backend/models/post.model';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../user/auth.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post: PostModel;
  @Input() authorID: string;
  authorName: string;
  authorImage: string;
  BACKEND_URL: string = environment.backendUrl;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser(this.authorID)
        .pipe(first())
        .subscribe(
            res => {
              this.authorName = res.firstName + res.lastName;
              this.authorImage = res.img ? this.BACKEND_URL + '/' + res.img.imageURL : '../../../assets/img/placeholder.jpg'
            }
        );
  }
}
