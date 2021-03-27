import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { formatDate } from '@angular/common';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  // you can override any of the methods defined in the parent class

  month(event: CalendarEvent): string {
    return `<b>${event.title}</b> - ${formatDate(event.start, 'MMMM dd, yyyy h:mma', this.locale)} to ${formatDate(event.end, 'MMMM dd, yyyy h:mma', this.locale)}`;
  }

  week(event: CalendarEvent): string {
    return `<b>${event.title}</b> - ${formatDate(event.start, 'MMMM dd, yyyy h:mma', this.locale)} to ${formatDate(event.end, 'MMMM dd, yyyy h:mma', this.locale)}`;
  }

  day(event: CalendarEvent): string {
    return `<b>${event.title}</b> - ${formatDate(event.start, 'MMMM dd, yyyy h:mma', this.locale)} to ${formatDate(event.end, 'MMMM dd, yyyy h:mma', this.locale)}`;
  }
}
