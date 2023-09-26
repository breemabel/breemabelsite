import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { AppComponent } from './app.component';

const routes: Routes = [{ path: "home", component: HomeComponent },
{ path: "about", component: AboutComponent },
{ path: "testimonials", component: TestimonialComponent },
{ path: "calendar", component: CalendarComponent }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  bootstrap: [AppComponent],
})
export class AppRoutingModule { }
