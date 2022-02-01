import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../interfaces';
import { PostService } from '../post-service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit, OnChanges {
  public form!: FormGroup;
  public editableData: any;
  public cardId: number = -0;

  constructor(private postService: PostService, private dialog: MatDialog) {
    this.postService.forEditData.subscribe((postData) => {
      this.editableData = postData;
    });
    this.postService.idNumber.subscribe((id) => {
      this.cardId = id;
    });
  }

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

    console.log('edi post', this.editableData, this.cardId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.form.setValue(this.editableData);
  }

  savePost() {
    if (this.cardId !== null) {
      let updatedPost: Post;
      if (this.cardId > 100) {
        this.cardId = 1;
        updatedPost = { ...this.editableData, id: this.cardId };
        this.postService.setEditedFormData(updatedPost);
      } else {
        updatedPost = { ...this.editableData, id: this.cardId };
        this.postService.setEditedFormData(updatedPost);
        console.log('card data', updatedPost);
      }
      // const updatedPost: Post = { ...this.editableData, id: this.cardId - 1};
      // this.postService.setEditedFormData(updatedPost);
      // console.log('card data', updatedPost);
    }

    this.form.reset();
    this.dialog.closeAll();
  }
}
