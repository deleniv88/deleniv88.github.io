import { Component, OnInit } from '@angular/core';
import { IBlogResponse } from '../shared/interfaces/blog/blog.interface';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public userBlog:Array<IBlogResponse> = [];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog():void{
    this.blogService.getAll().subscribe(data => {
      this.userBlog = data;
    })
  }


}
