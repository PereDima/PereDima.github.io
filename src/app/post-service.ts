import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Post } from "./interfaces";
import { map } from 'rxjs/operators'


@Injectable({ providedIn: 'root' })  

export class PostService {

  public formData = new Subject<Post>();
  public forEditData = new Subject<Post>();
  public editedData = new Subject<Post>();
  public idNumber = new BehaviorSubject<number>(-0);

  constructor(
    private http: HttpClient,
  ) { }
  
  public addPost(post: Post): Observable<Post> {
    return this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', post);
  }
  
  public updatePost(post: Post, id: number): Observable<Post> {
    return this.http.put<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`, post);
  }
  
  public loadPosts() {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=6')
    .pipe(map((post: any) => {
      return post.map((elem: any ) => {
       return {...elem, date: new Date().toLocaleDateString()}
     });
    }))
  }

  public deletePost(id: number) {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/posts/${id}`)
  }

  getFormData(data: Post) {
    this.formData.next(data);
  }
  
  setForEditData(data: Post) {
    this.forEditData.next(data);
  }

  setEditedFormData(data: Post) {
    this.editedData.next(data);
  }
  
  setId(data: number) {
    this.idNumber.next(data);
  }

}