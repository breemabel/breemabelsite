import { LOCALE_ID, Inject, Component, OnInit } from '@angular/core';
import { ModalService } from "../shared/services/modal.service";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from '../shared/services/event.service';
import { CalendarService } from '../shared/services/calendar.service';
import { formatDate } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-eventmodal',
  templateUrl: './eventmodal.component.html',
  styleUrls: ['./eventmodal.component.scss']
})
export class EventmodalComponent implements OnInit {
  id:number;
  subscription: Subscription;
  event: any;
  startDate: string;
  endDate: string;
  linkHtml: string;
  venueHtml: string;
  typeHtml: string;
  descHtml: string;
  suppHtml: string;
  imgHtml: string;

  constructor(private modalService: ModalService, private router: Router, private eventService: EventService,private CalendarService: CalendarService, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.subscription = this.eventService.currentid.subscribe(id => this.id = id)
    this.CalendarService.eventGet(this.id)
    .subscribe(response => {
      this.event = response;
      console.log(this.event);
      //These three are mandatory so they are set without ternary
      this.startDate = formatDate(this.event.startDate,'MMMM dd, yyyy h:mma', this.locale);
      this.endDate = formatDate(this.event.endDate,'MMMM dd, yyyy h:mma', this.locale);
      this.linkHtml = "Event URL: <a href='" + this.event.websiteUrl + "'>" + this.event.websiteUrl + "</a>";
      //Set description if it is there
      this.event.description ? this.descHtml = "Description: " + this.event.description : '';
      //Set type if it is there
      this.event.type ? this.typeHtml = "Event Type: " + this.event.type : '';
      //Set supportemail if it is there
      this.event.supportEmail ? this.suppHtml = "Support Email: " + this.event.supportEmail: '';
      //Set coverphoto if it is there
      this.event.coverPhotoUrl ? this.imgHtml = "<img src='" + this.event.coverPhotoUrl + "' alt='cover image missing' width=700 height=350>":
        this.imgHtml = "<img src='https://mms.businesswire.com/media/20171213005340/en/629646/22/Bizzabo_Logo.jpg' alt='cover image missing' width=700 height=350>";
      //Handle venue if it is there
      if(this.event.venue != undefined){
        this.venueHtml = "<hr><h4>Venue Info</h4>\n";
        this.event.venue.name ? this.venueHtml = this.venueHtml.concat("<h5>Venue Name: " + this.event.venue.name) + "</h5>\n" : "";
        this.event.venue.city ? this.venueHtml = this.venueHtml.concat("<h5>Venue City: " + this.event.venue.city) + "</h5>\n" : "";
        this.event.venue.state ? this.venueHtml = this.venueHtml.concat("<h5>Venue State: " + this.event.venue.state) + "</h5>\n" : "";
        this.event.venue.country ? this.venueHtml = this.venueHtml.concat("<h5>Venue Country: " + this.event.venue.country) + "</h5>\n" : "";
        this.event.venue.displayAddress ? this.venueHtml = this.venueHtml.concat("<h5>Venue Address: " + this.event.venue.displayAddress) + "</h5>\n" : "";
      }
      })
    ,error => {
      console.log(error);
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public close() {
    this.modalService.destroy();
  }

}
