import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {UserModel as User} from '../../../backend/models/user.model';
import {PostModel as Post} from '../../../backend/models/post.model';
import {environment} from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class PostService {
    API_URL: string = environment.apiUrl;
    headers = new HttpHeaders().set('Content-Type', 'application/json');
    private currentPostSubject: BehaviorSubject<Post>;
    public currentPost: Observable<Post>;

    constructor(private httpClient: HttpClient, public router: Router) {
    }

    createPost(data: {}): Observable<any> {
        return this.httpClient.post<any>(`${this.API_URL}/posts/create`, data)
            .pipe(map(res => {
                    return res;
                }),
                catchError(this.handleError)
            );
    }

    getPost(id: string): Observable<any> {
        return this.httpClient.get<any>(`${this.API_URL}/posts/` + id)
            .pipe(map(res => {
                    return res;
                }),
                catchError(this.handleError)
            );
    }

    getMyPost(id: string): Observable<any> {
        return this.httpClient.get<any>(`${this.API_URL}/posts/` + id + '/me')
            .pipe(map(res => {
                    return res;
                }),
                catchError(this.handleError)
            );
    }

    updatePost(id: string, data: {}): Observable<any> {
        return this.httpClient.put<any>(`${this.API_URL}/posts/` + id + '/update', data)
            .pipe(map(res => {
                    return res;
                }),
                catchError(this.handleError)
            );
    }

    deletePost(id: string, data: {}): Observable<any> {
        return this.httpClient.post<any>(`${this.API_URL}/posts/` + id + '/delete', data)
            .pipe(map(res => {
                    return res;
                }),
                catchError(this.handleError)
            );
    }

    getPostList() {
        console.log('hello');
        return this.httpClient.get<any>(`${this.API_URL}/posts/list`)
            .pipe(map(res => {
                console.log(res);
                    return res;
                }),
                catchError(this.handleError)
            );
    }

    getMyPostList() {
        return this.httpClient.get<any>(`${this.API_URL}/posts/list/me`)
            .pipe(map(res => {
                    return res;
                }),
                catchError(this.handleError)
            );
    }

    getUserPostList(id: string) {
        return this.httpClient.get<any>(`${this.API_URL}/posts/list/` + id)
            .pipe(map(res => {
                    return res;
                }),
                catchError(this.handleError)
            );
    }

    handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error) {
            return throwError(errorMessage);
        }
        const errorCode = errorRes.error;
        switch (errorCode) {
            case 'POST_DNE':
                errorMessage = 'This post does not exist!';
                break;
            case 'UNAUTHORIZED_ERROR':
                errorMessage = 'Not authorized to access these resources';
                break;
            case 'DELETE_ERROR':
                errorMessage = 'Error deleting post. Please try again or contact support.';
                break;
            case 'UPDATE_FAIL':
                errorMessage = 'Failed to update post. Please try again or contact support.';
                break;
            default: {
                errorMessage = 'An error occurred! Please try again or contact support.';
                break;
            }
        }
        return throwError(errorMessage);
    }
}
