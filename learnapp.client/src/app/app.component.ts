import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CourseServiceService, Course } from './services/course-service.service';
import { Alert, AlertComponent } from './components/alert/alert.component';
import { EmitChangesService } from './services/emit-changes.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'learnapp.client';
  alertType = "";
  alertMsg = "";
  isAlert:boolean = false;
  constructor(private service: CourseServiceService, private emitChanges:EmitChangesService, public snackBar: MatSnackBar) {
    debugger;
    this.setAlert(new Alert(false, "",""));
    emitChanges.changeEmitted$.subscribe(text => {
      debugger;
      this.openSnackBar(text.alertMsg, 'X',text.alertMsgType)
  });
   }

  ngOnInit() {
  }

  openSnackBar(message:string, action: string, className: string) {
    debugger;
    this.snackBar.open(message,action, {
      duration: 5000,
      panelClass: className,
      verticalPosition:'top',
      horizontalPosition:'end'
    });
  }

  setAlert(value: Alert)
  {
    this.alertType = value.alertMsgType;
    this.alertMsg = value.alertMsg;
    this.isAlert = value.isAlert;
  }

}
