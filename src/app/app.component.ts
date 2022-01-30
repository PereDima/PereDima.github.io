import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from './interfaces';
import { PostService } from './post-service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public form!: FormGroup;
  public posts: Post[] = [];

  public loading = false;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit(): void {

    this.postService
      .loadPosts()
      .subscribe((post) => {
        this.posts = post;
      });

    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      body: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
      ]),
    });
  }

  public addPost() {
    const newPost: Post = {
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value,
      date: new Date().toLocaleDateString(),
    };
    this.postService.addPost(newPost)
      .subscribe((resp) => {
        this.posts.unshift(resp);
      });

    this.form.reset();
  }

  public editPost(post: Post) {
    this.form.setValue({
      title: post.title,
      body: post.body
    })
  }


  public deletePost(id: number) {
    this.http.delete<void>(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .subscribe(() => {
        this.posts = this.posts.filter((p) => p.id !== id);
    })
  }
}
