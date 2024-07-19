import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitChangesService {
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  constructor() { }
  // Service message commands
  emitChange(change: any) {
      this.emitChangeSource.next(change);
  }
}
