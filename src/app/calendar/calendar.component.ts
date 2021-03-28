import { Component,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef, } from '@angular/core';
  import {
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
import { Subject, Subscription } from 'rxjs';
import { ModalService } from "../shared/services/modal.service";
import { EventmodalComponent } from '../eventmodal/eventmodal.component';
import { EventService } from '../shared/services/event.service';

//Set up the colors used
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
    primary: '#fff502',
    secondary: '#fdffcf',
  },
  green: {
    primary: '#219e10',
    secondary: '#e6ffe2',
  },
  purple: {
    primary: '#7f0ace',
    secondary: '#f0e2ff',
  },
  orange: {
    primary: '#f76300',
    secondary: '#ffe1ce',
  },
  aqua: {
    primary: '#00c2ab',
    secondary: '#d4f7f2',
  },
  pink: {
    primary: '#d500c4',
    secondary: '#ffe9fd',
  },
  brown:{
    primary: '#976443',
    secondary: '#eecfbb',
  }
};


@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      //Custom format for events
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ]
})
export class CalendarComponent implements OnInit {
  //init vars
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  importedEvents: any;
  events: CalendarEvent[] = [];
  id : number;
  subscription: Subscription;

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  //so I can refresh the page
  refresh: Subject<any> = new Subject();

  constructor(private CalendarService: CalendarService,private modalService:ModalService, private eventService: EventService) {
  }

  ngOnInit() {
      //communicate with Event Service
      this.subscription = this.eventService.currentid.subscribe(id => this.id = id)
      //communicate with API
      this.CalendarService.eventGetAll()
        .subscribe(response => {
          this.importedEvents = response;
          let colorNo = 0;
          //This is how I am assigning colors, I assume there is a better way and would love to know it.
          let color = ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'aqua', 'pink', 'brown']
          //Go through each event pulled from API and add it to the CalendarEvents and assign a color.
          this.importedEvents.content.forEach(element => {
            this.addEvent(element.startDate, element.endDate, element.name, color[colorNo], element.id)
            if(colorNo < 8){
              colorNo+=1;
            }
            else{
              colorNo = 0;
            }
          });
          this.refresh.next();
        }, error => {
          console.log(error);
        });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  activeDayIsOpen: boolean = false;

  //Handles the mini menus for each day of the month, taken from docs
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

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  //In order to put the events on the calendar I must convert the Bizzabo Events to Angular CalendarEvent
  addEvent(startDate: string, endDate: string, title: string, color: string, id: number): void {
    this.events = [
      ...this.events,
      {
        title: title,
        start: new Date(startDate),
        end: new Date(endDate),
        color: colors[color],
        id: id
      },
    ];
  }

  //handles the opening of the event modals with and passes the ID to the Event Service
  eventClicked({ event }: { event: CalendarEvent }): void {
    this.eventService.changeId(event.id);
    this.modalService.init(EventmodalComponent, {}, {});
  }

}
