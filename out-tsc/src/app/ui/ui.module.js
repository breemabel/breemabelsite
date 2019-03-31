import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
var UiModule = /** @class */ (function () {
    function UiModule() {
    }
    UiModule = tslib_1.__decorate([
        NgModule({
            declarations: [LayoutComponent, HeaderComponent, FooterComponent],
            imports: [
                CommonModule
            ],
            exports: [LayoutComponent]
        })
    ], UiModule);
    return UiModule;
}());
export { UiModule };
//# sourceMappingURL=ui.module.js.map