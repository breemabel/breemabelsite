import { Component, OnInit } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { CalendarService } from '../shared/services/calendar.service'


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  event: any;
  constructor(private CalendarService: CalendarService) {
  }

  ngOnInit() {
      this.CalendarService.eventGetAll()
        .subscribe(response => {
          this.event = response;
          console.log(this.event)
        }, error => {
          console.log(error);
        });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

}
