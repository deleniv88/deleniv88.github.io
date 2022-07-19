import { Component, OnInit } from '@angular/core';
import { IBlog } from '../shared/interfaces/blog/blog.interface';
import { BlogService } from '../shared/services/blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {

  public inputTitle = 'inputTitle';
  public inputText = 'inputText';
  public inputAuthor = 'inputAuthor';
  public inputBtn = 'inputBtn';
  public inputError = 'inputError';
  public placeholderAddTitle = 'title here...';
  public placeholderAddText = 'text here...';
  public placeholderAddAuthor = 'author here...';

  public title!: string;
  public text!: string;
  public author!: string;
  public imagePath = 'https://asset.kompas.com/crops/7msXzpGEtgtdootwj4Q2cbkx3T8=/0x0:1920x1280/750x500/data/photo/2022/03/28/6241538e6229a.jpg';
  public adminBlog: IBlog[] = [];
  public editStatus: boolean = false;
  public editId!: number;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog(): void {
    this.blogService.getAll().subscribe(data => {
      console.log(data);
      this.adminBlog= data;
    })
  }

  addBlog(): void {
    if (!this.text && !this.title && !this.author){
      this.inputText = 'inputError';
      this.inputTitle = 'inputError';
      this.inputAuthor = 'inputError';
    }
    else if(!this.text && !this.title){
      this.inputText = 'inputError';
      this.inputTitle = 'inputError';
    } 
    else if (!this.title && !this.author){
      this.inputTitle = 'inputError';
      this.inputAuthor = 'inputError';
    }
    else if(!this.text && !this.author){
      this.inputText = 'inputError';
      this.inputAuthor = 'inputError';
    } 
    else if(!this.title){
      this.inputTitle = 'inputError';
    }
    else if(!this.text){
      this.inputText = 'inputError';
    }
    else if(!this.author){
      this.inputAuthor = 'inputError';
    }
    else {
      const newBlog = {
        title: this.title,
        text: this.text,
        author: this.author,
        imagePath: this.imagePath
      }
      this.blogService.create(newBlog).subscribe(() => {
        this.getBlog();
        this.resetForm();
      });
      this.inputTitle = "inputTitle";
      this.inputText = "inputTitle";
      this.inputAuthor = "inputTitle";
    }
  }

  editBlog(blog: IBlog): void {
    this.title = blog.title;
    this.text = blog.text;
    this.author = blog.author;
    this.imagePath = blog.imagePath;
    this.editStatus = true;
    this.editId = blog.id;
  }

  deleteBlog(blog: IBlog): void {
    if (confirm('Are you sure?')) {
      this.blogService.delete(blog.id).subscribe(() => {
        this.getBlog();
      })
    }
  }

  saveBlog(): void {
    const updateBlog = {
      title: this.title,
      text: this.text,
      author: this.author,
      imagePath: this.imagePath
    };
    this.blogService.update(updateBlog, this.editId).subscribe(() => {
      this.getBlog();
    });
    this.resetForm();
  }

  private resetForm(): void {
    this.title = '';
    this.text = '';
    this.author = '';
    this.imagePath = 'https://asset.kompas.com/crops/7msXzpGEtgtdootwj4Q2cbkx3T8=/0x0:1920x1280/750x500/data/photo/2022/03/28/6241538e6229a.jpg';
    this.editStatus = false;
  }


}
