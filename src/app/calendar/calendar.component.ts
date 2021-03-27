import { Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, } from '@angular/core';
  import {
    CalendarDateFormatter,
    CalendarEvent,
    CalendarEventTitleFormatter,
    CalendarView,
  } from 'angular-calendar';
import { CalendarService } from '../shared/services/calendar.service';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import { calendar } from 'ngx-bootstrap/chronos/moment/calendar';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { ModalService } from "../shared/services/modal.service";
import { CalendarOpenDayEventsComponent } from 'angular-calendar/modules/month/calendar-open-day-events.component';
import { title } from 'process';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ]
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  imported: any;

  events: CalendarEvent[] = [];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  constructor(private CalendarService: CalendarService) {
  }

  ngOnInit() {
      this.CalendarService.eventGetAll()
        .subscribe(response => {
          this.imported = response;
          console.log(this.imported)
          this.imported.content.forEach(element => {
            this.addEvent(element.startDate, element.endDate, element.name)
          });
          console.log(this.events);
          this.refresh.next();
        }, error => {
          console.log(error);
        });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  activeDayIsOpen: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  addEvent(startDate: string, endDate: string, title: string): void {
    this.events = [
      ...this.events,
      {
        title: title,
        start: new Date(startDate),
        end: new Date(endDate),
        color: colors.red,
      },
    ];
  }

    closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
