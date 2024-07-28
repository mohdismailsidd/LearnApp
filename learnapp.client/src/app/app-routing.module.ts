import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CourseListComponent
  },
  {
    path: 'CourseList',
    component: CourseListComponent
  },
  {
    path: "CourseList/:id",
    component: CourseDetailComponent
  },
  {
    path: "AddCourse/:isNew",
    component: CourseDetailComponent
  },
  {
    path: "EditCourse/:id",
    component: CourseDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
