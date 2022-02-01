import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Post } from './interfaces';
import { PostService } from './post-service';
import { MatDialog } from '@angular/material/dialog';
import { PostFormComponent } from './post-form/post-form.component';
import { EditFormComponent } from './edit-form/edit-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, DoCheck {
  public form!: FormGroup;
  public posts: Post[] = [];
  public ind: number = 0;
  public date = new Date().toLocaleDateString();
  public postForEdit: any;
  public editedPost: any;
  public search = '';

  constructor(
    private postService: PostService,
    private dialog: MatDialog
  ) {
    this.postService.formData.subscribe((addedPost) => {
      this.posts.unshift(addedPost);
    });
    this.postService.editedData.subscribe((readyPost) => {
      this.editedPost = readyPost;
    });
  }

  ngOnInit(): void {
    this.postService.loadPosts().subscribe((post) => {
      this.posts = post;
    });
  }

  ngDoCheck() {
    this.postService.setForEditData(this.postForEdit);

    if (this.editedPost) {
      this.posts[this.editedPost.id - 1] = this.editedPost;
      this.editedPost = null;
    }
  }

  public editPost(post: Post) {
    this.postService.setId(post.id!);
    this.dialog.open(EditFormComponent, {
      data: {},
      panelClass: 'glass',
    });
    this.postService.setForEditData(this.postForEdit);
    return (this.postForEdit = {
      title: post.title,
      body: post.body,
    });
  }

  public deletePost(id: number) {
    this.postService.deletePost(id)
      .subscribe(() => {
        this.posts = this.posts.filter((p) => p.id !== id);
      });
  }

  public openDialog() {
    this.dialog.open(PostFormComponent, {
      data: {},
      panelClass: 'glass',
    });
  }
}
