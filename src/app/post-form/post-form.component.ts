import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionLike } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Post } from '../interfaces';
import { PostService } from '../post-service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public posts: Post[] = [];
  public sub$: any;

  constructor(private postService: PostService, private dialog: MatDialog, ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(85),
      ]),
      body: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(400),
      ]),
    });
  }

  public addPost() {
    const newPost: Post = {
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value,
      date: new Date().toLocaleDateString(),
    };
    this.sub$ = this.postService.addPost(newPost)
      .pipe(
        finalize(() => console.log('addPost completed')))
      .subscribe((resp) => {
      this.posts.unshift(resp);
      this.postService.getFormData(resp);
    });

      this.dialog.closeAll();
  }

  ngOnDestroy(): void {
    if (!(this.sub$.destination.closed)) {
      setTimeout(() => {
        this.sub$.unsubscribe();
      }, 1000);
    }
  }
}
