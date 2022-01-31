import { Pipe, PipeTransform } from '@angular/core';
import { Post } from './interfaces';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(posts: Post[], search = ''): Post[] {
    if (!search.trim()) {
      return posts;
    }
   
    return posts.filter(post => {
      return post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    })
  }

}
