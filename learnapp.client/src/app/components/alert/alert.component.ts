import { Component, inject, Inject, Input, SimpleChanges } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {  
 alert:Alert;
 snackBarRef = inject(MatSnackBarRef);
 constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { 
  debugger;
  this.alert = JSON.parse(data);
 }

 ngOnInit() {
 
}

} 

export class Alert{
  isAlert:boolean;
  alertMsgType:string;
  alertMsg:string;

  constructor(isAlert:boolean,alertMsgType:string,alertMsg:string)
  {
    debugger;
    this.isAlert = isAlert;
    this.alertMsgType = alertMsgType;
    this.alertMsg = alertMsg;
  }
}
