import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './shared/services/user.service';
import { BaseService } from './shared/services/base.service';
import { ConfigService } from './shared/utils/config.service';
import { HttpModule } from '@angular/http';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthGuard } from './auth.guard';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ModalService } from './shared/services/modal.service';
import { DomService } from './shared/services/dom.service';
import { TestformComponent } from './testform/testform.component';
import { TestimodalService } from './shared/services/testimodal.service';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarService } from './shared/services/calendar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventmodalComponent } from './eventmodal/eventmodal.component';
import { EventService } from './shared/services/event.service';
import { LimaAiComponent } from './lima-ai/lima-ai.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'testimonial', component: TestimonialComponent },
  { path: 'about', component: AboutComponent },
  { path: 'calendar', component: CalendarComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    AboutComponent,
    FooterComponent,
    HeaderComponent,
    TestimonialComponent,
    LoginComponent,
    TestformComponent,
    CalendarComponent,
    EventmodalComponent,
    LimaAiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forRoot(routes),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  exports: [RouterModule],
  providers: [UserService, ConfigService, AuthGuard, ModalService, DomService, TestimodalService, CalendarService, EventService],
  entryComponents:[
    LoginComponent,
    SignupComponent,
    TestformComponent,
    EventmodalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
