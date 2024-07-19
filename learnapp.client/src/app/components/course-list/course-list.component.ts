import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Course, CourseServiceService } from '../../services/course-service.service';
import { Alert } from '../alert/alert.component';
import { EmitChangesService } from '../../services/emit-changes.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses: any;
  course: any;
  @Output() alertOutput = new EventEmitter<Alert>();
  constructor(private service: CourseServiceService, private emitChanges:EmitChangesService, private router:Router)
  {
    debugger;
    this.courses = new Array<Course>();
    this.service.getAllCourses()
     .then((data) => { 
        debugger;
       this.courses = data;
        console.log(this.courses);
     }).catch((error) => {
        this.alertOutput.emit(new Alert(true, "danger",error));
     });
    console.log(this.courses);
  }

  ngOnInit() {
  }

  delete(id: number)
  {
    this.service.removeCourse(id)
     .then((data) => { 
        debugger;
       this.courses = data;
        console.log(this.courses);
        this.emitChanges.emitChange(new Alert(true, "success","Data is deleted Successfully with id:"+id));
        this.router.navigateByUrl("");
     }).catch((error) => {
        this.alertOutput.emit(new Alert(true, "danger",error));
     });
  }
}
