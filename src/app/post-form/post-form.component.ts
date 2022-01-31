import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../interfaces';
import { PostService } from '../post-service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  public form!: FormGroup;
  public posts: Post[] = [];


  constructor(private postService: PostService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(55),
      ]),
      body: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(230),
      ]),
    });
  }

  public addPost() {
    const newPost: Post = {
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value,
      date: new Date().toLocaleDateString(),
    };
    this.postService.addPost(newPost).subscribe((resp) => {
      this.posts.unshift(resp);
      this.postService.getFormData(resp);
    });

    this.dialog.closeAll();
  }

}

