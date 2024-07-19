import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, CourseServiceService } from '../../services/course-service.service';
import { Alert } from '../alert/alert.component';
import { EmitChangesService } from '../../services/emit-changes.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  isNew: boolean = false;
  isEditMode: boolean = false;
  isEditable: boolean = false;
  isAlertMsg:boolean = false;
  isUpdated:boolean = true;
  alertMsgClass:string = "";
  alertMsg:string = "";
  course: Course;
  courseId: number


  constructor(private route: ActivatedRoute, private courseService: CourseServiceService,  private router: Router, private emitChanges: EmitChangesService) {
    debugger;
    this.course = new Course(0, "","","",0);
    console.log("courseId", route.snapshot.paramMap.get("id"));
    this.courseId = Number(route.snapshot.paramMap.get("id"));
    if(this.courseId)
    {
      this.OpenUpdateForm();
    }
    else{
      this.OpenNewForm(route);
    }
  }

  ngOnInit(): void {
  }

  enableEdit() {
    debugger;
    this.isEditable = !this.isEditable;
  }

  update(course: any) {
    let crs = this.ValidateData(course);
    debugger;
    this.courseService.updateCourse(crs).then((data: Course) => {
      debugger;
      this.course = data;
      this.isEditMode = true;
      this.isEditable = false;
      this.emitChanges.emitChange(new Alert(true, "success","Data is updated Successfully"));
    }).catch((error) => {
      this.emitChanges.emitChange(new Alert(true, "danger",error));
    });
  }

  addCourse(course: any)
  {
    let crs = new Course(0, course.name1, course.description1, course.author1, course.cost1)
    debugger;
    this.courseService.addCourse(crs).then((data: Course) => {
      debugger;
      this.course = data;
      this.emitChanges.emitChange(new Alert(true, "success","Data is created Successfully with id:"+this.course.id));
      this.router.navigateByUrl('CourseList/'+this.course.id);
    }).catch((error) => {
      debugger;
      this.emitChanges.emitChange(new Alert(true, "danger",error));
    });
  }

  onKeyUpName(event: any) { // appending the updated value to the variable 
    this.CheckData(this.course.name,event);
  } 

  onKeyUpDesc(event: any) { // appending the updated value to the variable 
    this.CheckData(this.course.description,event);
  } 

  onKeyUpAuthor(event: any) { // appending the updated value to the variable     
    this.CheckData(this.course.author,event);
  } 

  onKeyUpCost(event: any) { // appending the updated value to the variable 
    this.CheckData(this.course.cost,event);
  } 

  private ValidateData(course: any) {
    let crs = new Course(course.id2, course.name2, course.description2, course.author2, course.cost2);
    crs.id = this.course.id;
    if (course.name2 === '')
      crs.name = this.course.name;
    if (course.description2 === '')
      crs.description = this.course.description;
    if (course.author2 === '')
      crs.author = this.course.author;
    if (course.cost2 === '' || course.cost2 === 0)
      crs.cost = this.course.cost;
    return crs;
  }

  private CheckData(value:any, event: any) {
    if ( value == event.target.value)
      this.isUpdated = true;

    else
      this.isUpdated = false;
  }

  private OpenNewForm(route: ActivatedRoute) {
    console.log("courseId", route.snapshot.paramMap.get("id"));
    this.isNew = Boolean(route.snapshot.paramMap.get("isNew"));
    this.isEditMode = false;
    this.isEditable = false;
  }

  private OpenUpdateForm() {
    debugger;
    this.isEditable = false;

    if(this.router.url.indexOf("EditCourse") > -1)
      this.isEditable = true;

    this.isEditMode = true;
    this.courseService.getCourse(this.courseId).then((data: Course) => {
      debugger;
      this.course = new Course(data.id, data.name, data.description, data.author, data.cost);
    }).catch((error) => {
      this.emitChanges.emitChange(new Alert(true, "danger", error));
    });
  }
}
