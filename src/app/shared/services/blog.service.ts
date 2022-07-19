import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBlogRequest, IBlogResponse } from '../interfaces/blog/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url = environment.BACKEND_URL;
  private api = { blogs: ` ${this.url}/blogs`};

  constructor(
    private htpp:HttpClient
    ){ }

  getAll():Observable<IBlogResponse[]>{
    return this.htpp.get<IBlogResponse[]>(this.api.blogs);
  }

  getOne(id:number):Observable<IBlogResponse>{
    return this.htpp.get<IBlogResponse>(`${this.api.blogs}/${id}`);
  }

  create(blog: IBlogRequest):Observable<IBlogResponse>{
    return this.htpp.post<IBlogResponse>(this.api.blogs,blog);
  }

  update(blog: IBlogRequest, id:number):Observable<IBlogResponse>{
    return this.htpp.patch<IBlogResponse>(`${this.api.blogs}/${id}`,blog);
  }

  delete(id: number):Observable<void>{
    return this.htpp.delete<void>(`${this.api.blogs}/${id}`)
  }
}

