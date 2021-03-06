import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../user/auth.service';
import {PostService} from '../post.service';
import {PostModel} from '../../../../backend/models/post.model';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {
    BACKEND_URL: string = environment.backendUrl;
    postForm: FormGroup;
    returnUrl: string;
    authorID: string;
    edit: boolean;
    originalDate: string;

    loading: boolean;
    submitted: boolean;
    error: String;
    post$: Observable<PostModel>;
    coverImg: string;
    img1: string;
    img2: string;
    img3: string;

    constructor(public formBuilder: FormBuilder, private route: ActivatedRoute,
                private router: Router, private postService: PostService, private authService: AuthService) {
    }

    ngOnInit() {
        // @ts-ignore
        this.authorID = this.authService.currentUserValue._id;
        if (this.route.snapshot.paramMap.get('id')) {
            const id = this.route.snapshot.paramMap.get('id');
            this.edit = true;
            this.getPost(id);
        } else {
            this.edit = false;
            this.postForm = this.formBuilder.group({
                author: [this.authorID],
                published: [],
                postDate: ['', Validators.required],
                title: ['', Validators.required],
                title2: [''],
                subtitle1: ['', Validators.required],
                description1: ['', Validators.required],
                subtitle2: [''],
                description2: [''],
                subtitle3: [''],
                description3: [''],
                quote1: [''],
                quoter1: [''],
                quote2: [''],
                quoter2: [''],
                category: [''],
                coverImg: [''],
                img1: [''],
                img2: [''],
                img3: ['']
            });
        }
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('blog-post');
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/profile';
    }

    getPost(id: string) {
        this.post$ = this.postService.getMyPost(id);
        this.post$.pipe(first()).subscribe(
            res => {
                this.coverImg = res.coverImg ? this.BACKEND_URL + '/' + res.coverImg.imageURL : '../../../assets/img/image_placeholder.jpg';
                this.img1 = res.img1 ? this.BACKEND_URL + '/' + res.img1.imageURL : '../../../assets/img/image_placeholder.jpg';
                this.img2 = res.img2 ? this.BACKEND_URL + '/' + res.img2.imageURL : '../../../assets/img/image_placeholder.jpg';
                this.img3 = res.img3 ? this.BACKEND_URL + '/' + res.img3.imageURL : '../../../assets/img/image_placeholder.jpg';
                const date = new Date(res.postDate);
                const dateObject = {
                    year: date.getUTCFullYear(),
                    month: date.getUTCMonth() + 1,
                    day: date.getUTCDate()
                };
                this.originalDate = date.toISOString().split('T')[0];
                this.postForm = this.formBuilder.group({
                    author: [this.authorID],
                    published: [res.published],
                    postDate: [dateObject, Validators.required],
                    title: [res.title, Validators.required],
                    title2: [res.title2],
                    subtitle1: [res.subtitle1, Validators.required],
                    description1: [res.description1, Validators.required],
                    subtitle2: [res.subtitle2],
                    description2: [res.description2],
                    subtitle3: [res.subtitle3],
                    description3: [res.description3],
                    quote1: [res.quote1],
                    quoter1: [res.quoter1],
                    quote2: [res.quote2],
                    quoter2: [res.quoter2],
                    category: [res.category],
                    coverImg: [this.coverImg],
                    img1: [this.img1],
                    img2: [this.img2],
                    img3: [this.img3]
                })
            }, error => {
                window.alert('Access not allowed or post does not exist!');
                this.router.navigate(['/blog'])
            }
        );
    }

    get f() {
        return this.postForm.controls;
    }

    createUpdatePost() {
        const formData = new FormData();
        this.submitted = true;
        if (this.postForm.invalid) {
            return;
        }
        const myFormValue = this.postForm.value;
        for ( let i = 0; i < myFormValue.length; i++ ) {
            for ( const key of myFormValue) {
                formData.append(key, myFormValue[key]);
            }
        }
        this.postForm.controls['author'].setValue(this.authorID);
        const postDate = this.postForm.controls['postDate'].value;
        const newPostDate = new Date();
        if (this.postForm.controls['coverImg'].value === '../../../assets/img/image_placeholder.jpg') {
            this.postForm.controls['coverImg'].setValue(null);
        } else if (this.postForm.controls['coverImg'].value !== null) {
            if (this.postForm.controls['coverImg'].value !== '') {
                const coverImg = this.postForm.controls['coverImg'].value;
                this.postForm.controls['coverImg'].setValue({img: this.postForm.controls['coverImg'].value, name: this.postForm.controls['coverImg'].value.name});
                formData.append('coverImg', coverImg, coverImg.name);
            }
        }
        if (this.postForm.controls['img1'].value === '../../../assets/img/image_placeholder.jpg') {
            this.postForm.controls['img1'].setValue(null);
        } else if (this.postForm.controls['img1'].value !== null) {
            if (this.postForm.controls['img1'].value !== '') {
                this.postForm.controls['img1'].setValue({img: this.postForm.controls['img1'].value, name: this.postForm.controls['img1'].value.name});
                formData.append('img1', this.postForm.controls['img1'].value, this.postForm.controls['img1'].value.name);
            }
        }
        if (this.postForm.controls['img2'].value === '../../../assets/img/image_placeholder.jpg') {
            this.postForm.controls['img2'].setValue(null);
        } else if (this.postForm.controls['img2'].value !== null) {
            if (this.postForm.controls['img2'].value !== '') {
                this.postForm.controls['img2'].setValue({img: this.postForm.controls['img2'].value, name: this.postForm.controls['img2'].value.name});
                formData.append('img2', this.postForm.controls['img2'].value, this.postForm.controls['img2'].value.name);
            }
        }
        if (this.postForm.controls['img3'].value === '../../../assets/img/image_placeholder.jpg') {
            this.postForm.controls['img3'].setValue(null);
        } else if (this.postForm.controls['img3'].value !== null) {
            if (this.postForm.controls['img3'].value !== '') {
                this.postForm.controls['img3'].setValue({img: this.postForm.controls['img3'].value, name: this.postForm.controls['img3'].value.name});
                formData.append('img3', this.postForm.controls['img3'].value, this.postForm.controls['img3'].value.name);
            }
        }
        newPostDate.setUTCDate(postDate.day);
        newPostDate.setUTCMonth(postDate.month - 1);
        newPostDate.setUTCFullYear(postDate.year);
        this.postForm.controls['postDate'].setValue(newPostDate);
        this.loading = true;
        if (this.route.snapshot.paramMap.get('id')) {
            const id = this.route.snapshot.paramMap.get('id');
            this.postService.updatePost(id, formData)
                .pipe(first())
                .subscribe(
                    data => {
                        window.alert('Successfully updated post!');
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        this.error = error;
                        this.loading = false;
                    }
                );
        } else {
            this.postService.createPost(formData)
                .pipe(first())
                .subscribe(
                    data => {
                        window.alert('Successfully created new post!');
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        this.error = error;
                        this.loading = false;
                    }
                );
        }
    }

    updatePost() {
        this.submitted = true;
        if (this.postForm.invalid) {
            return;
        }
        this.loading = true;
        const id = this.route.snapshot.paramMap.get('id');
        this.postService.updatePost(id, this.postForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    window.alert('Successfully updated post!');
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
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
