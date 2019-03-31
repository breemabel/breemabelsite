import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './shared/services/user.service';
import { ConfigService } from './shared/utils/config.service';
import { HttpModule } from '@angular/http';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth.guard';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ModalService } from './shared/services/modal.service';
import { DomService } from './shared/services/dom.service';
import { TestformComponent } from './testform/testform.component';
import { TestimodalService } from './shared/services/testimodal.service';
import { CommonModule } from '@angular/common';
var routes = [
    { path: 'home', component: HomeComponent },
    { path: 'testimonial', component: TestimonialComponent },
    { path: 'about', component: AboutComponent }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                AppComponent,
                HomeComponent,
                SignupComponent,
                AboutComponent,
                FooterComponent,
                HeaderComponent,
                TestimonialComponent,
                LoginComponent,
                TestformComponent
            ],
            imports: [
                BrowserModule,
                AppRoutingModule,
                FormsModule,
                HttpModule,
                CommonModule,
                RouterModule.forRoot(routes),
            ],
            providers: [UserService, ConfigService, AuthGuard, ModalService, DomService, TestimodalService],
            entryComponents: [
                LoginComponent,
                SignupComponent,
                TestformComponent
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map