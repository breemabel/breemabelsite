import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EventService {
  //This exists just to pass the ID from Calendar to EventModal. For some reason my modals are siblings, which isn't necessarily bad just weird.
  private id = new BehaviorSubject(0);
  currentid = this.id.asObservable();

  constructor() { }

  changeId(newId: any) {
    this.id.next(newId)
  }

}
