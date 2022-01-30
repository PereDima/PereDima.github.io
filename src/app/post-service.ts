import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Post } from "./interfaces";
import { map } from 'rxjs/operators'


@Injectable({ providedIn: 'root' })  

export class PostService {

  constructor(
    private http: HttpClient,
  ) { }
  
  public addPost(post: Post): Observable<Post> {
    return this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', post)
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
    this.http.delete<void>(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .subscribe(resp => {
      console.log(resp);
    })
  }

}