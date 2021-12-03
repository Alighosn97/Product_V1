import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

import {ActionEvent} from "../State/products.state";

@Injectable({providedIn : 'root'})
export class EventDriverService{
  sourceEventSubject:Subject<ActionEvent>=new Subject<ActionEvent>();
  subjectEventSubjectObservable=this.sourceEventSubject.asObservable();
  publishEvent(event : ActionEvent){
    this.sourceEventSubject.next(event);
  }
}
