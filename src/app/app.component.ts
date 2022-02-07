import { Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Post } from './interfaces';
import { PostService } from './post-service';
import { MatDialog } from '@angular/material/dialog';
import { PostFormComponent } from './post-form/post-form.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, DoCheck {
  public form!: FormGroup;
  public date = new Date().toLocaleDateString();
  public postForEdit: any;
  public editedPost: any;
  public search = '';
  public posts: Post[] = [
    {
      title: 'best baseball team',
      body: 'The New York Yankees have been the best team in the East division for many years. The club was founded in Baltimore in 1901 as the Baltimore Orioles and was renamed the New York Yankees in 1913. The baseball scoreboards show that the New York Yankees have won the World Series 27 times, the most recent time being in 2009.',
      id: 4,
    },
    {
      title: 'best football team',
      body: "Nine consecutive Bundesliga titles, five German Cup titles and two Champions League trophies in the last nine years. Bayern Munich are a consistent force. They boast the world's best striker, Robert Lewandowski, who was criminally overlooked for the Ballon d'Or this year after scoring 41 goals in just 29 league games last season.",
      id: 5,
    },
    {
      title: 'best basketball team',
      body: "The Los Angeles Lakers are an American professional basketball team based in Los Angeles. The Lakers compete in the National Basketball Association (NBA) as a member of the league's Western Conference Pacific Division. The Lakers are one of the most successful teams in the history of the NBA, and have won 17 NBA championships, tied with the Boston Celtics for the most in NBA history.",
      id: 6,
    },
    {
      title: 'Race car drifting: Just sideways at 90 mph',
      body: 'As the next turn nears, Gittin pumps the clutch and yanks a neon green hand brake. The rear wheels lose traction, sending the car into a power slide and unleashing a torrent of smoke into the packed grandstands.',
      id: 7,
    },
    {
      title: 'drag race: push car limits',
      body: 'Drag racing can damage a car that is not perfectly maintained. Typically drag cars will be serviced after each run and will have overall maintenance done to the engine and all moving parts. The Top Fuel division engines and sequential are rebuilt after each run due to the significant damage it incurs.',
      id: 8,
    },
    {
      title: 'ILLEGAL Night Drifting Warming Up The Cold Streets',
      body: 'What amazed us the most was the fact that the cars are sliding like they are on ice, literally like they are inside endless drifting loop, it’s just beautiful for watching. Also what else we noticed is the hierarchy of the group, the Nissan is ruling them, it’s the big boss. The yellow Honda Prelude was trying to get the lead but never actually tried to interfere in the boss’s path.',
      id: 9,
    },
  ];

  constructor(private postService: PostService, private dialog: MatDialog) {
    this.postService.formData.subscribe((addedPost) => {
      this.posts.unshift(addedPost);
    });
    this.postService.editedData.subscribe((readyPost) => {
      this.editedPost = readyPost;
    });
  }

  ngOnInit(): void {
    this.postService.loadPosts().subscribe((post) => {
      this.posts.unshift(...post);
    });
  }

  ngDoCheck() {
    this.postService.setForEditData(this.postForEdit);

    if (this.editedPost) {
      this.posts[this.editedPost.id] = this.editedPost;
      this.editedPost = null;
    }
  }

  public editPost(post: Post) {
    let arrPlaceId = -0;
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id === post.id!) {
        arrPlaceId = i;
      }
    }
    this.postService.setId(arrPlaceId);
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
    this.postService
      .deletePost(id)
      .pipe(
        take(1),
        finalize(() => {
          console.log('deletePost completed');
        })
      )
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
