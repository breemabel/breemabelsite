import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
        this.routes = [{ path: "home", component: HomeComponent },];
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map