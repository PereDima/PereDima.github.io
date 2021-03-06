import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PostFormComponent } from './post-form/post-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditFormComponent } from './edit-form/edit-form.component';
import { FilterPipe } from './filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    PostFormComponent,
    EditFormComponent,
    FilterPipe,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    MatGridListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
