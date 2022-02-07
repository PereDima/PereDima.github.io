import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { Post } from '../interfaces';
import { PostService } from '../post-service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit, OnChanges, OnDestroy {
  public form!: FormGroup;
  public editableData: any;
  public cardId: number = -0;
  public sub1$: any;
  public sub2$: any;


  constructor(private postService: PostService, private dialog: MatDialog) {
    this.sub1$ = this.postService.forEditData
      .pipe(finalize(() => console.log('forEditData completed')))
      .subscribe((postData) => {
      this.editableData = postData;
    });
    this.sub2$ = this.postService.idNumber
      .pipe(finalize(() => console.log('idNumber completed')))
      .subscribe((id) => {
      this.cardId = id;
    });
  }

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

  ngOnChanges(): void {
    this.form.setValue(this.editableData);
  }

  savePost() {
    if (this.cardId !== -1) {
      let updatedPost: Post;
        updatedPost = { ...this.editableData, id: this.cardId };
        this.postService.setEditedFormData(updatedPost);
    }

    this.form.reset();
    this.dialog.closeAll();
  }

  ngOnDestroy(): void {
    if (!(this.sub1$.destination.closed)) {
      setTimeout(() => {
        this.sub1$.unsubscribe();
      }, 1000);
    };

    if (!(this.sub2$.destination.closed)) {
      setTimeout(() => {
        this.sub2$.unsubscribe();
      }, 1000);
    }
  }
}
