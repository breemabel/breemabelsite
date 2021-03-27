import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EventService {

  private id = new BehaviorSubject(0);
  currentid = this.id.asObservable();

  constructor() { }

  changeId(newId: any) {
    this.id.next(newId)
  }

}
