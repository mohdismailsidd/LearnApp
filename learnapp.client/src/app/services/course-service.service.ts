import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BaseService } from './base.service';



@Injectable({
  providedIn: 'root'
})
export class CourseServiceService extends BaseService<Course> {
  url: string = this.baseUrl + "Courses";

  constructor(private client: HttpClient) {
    super(client);
  }

   getAllCourses() :Promise<Course[]> {
    // debugger;
    // let courses: Course[] = new Array();
    // courses = super.get<Course>(this.url);
    // return courses;
    return super.get<Course>(this.url);
  }

  getCourse(id: number): Promise<Course> {
    return super.getById<Course>(this.url, id);
  }

  addCourse(course: Course): Promise<Course> {
    return super.post<Course>(this.url, course);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  removeCourse(id: number): Promise<Course> {
    return super.delete<Course>(this.url, id);
  }

  updateCourse(course: Course): Promise<Course> {
    return super.patch<Course>(this.url, course);
  }
}

export interface ICourse {
  id: number;
  name: string;
  description: string;
  author: string;
  cost: number;
}

export class Course implements ICourse {
  id: number;
  name: string;
  description: string;
  author: string;
  cost: number;

  constructor(id: number, name: string, description: string, author: string, cost: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.author = author;
    this.cost = cost;
  }
}
