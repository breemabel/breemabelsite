import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalService } from '../shared/services/modal.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { TestformComponent } from '../testform/testform.component';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(modalService) {
        this.modalService = modalService;
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.readLocalStorageValue = function () {
        if (localStorage.getItem("auth_token") != null) {
            return true;
        }
        return false;
    };
    HeaderComponent.prototype.logoff = function () {
        localStorage.removeItem("auth_token");
    };
    HeaderComponent.prototype.initLoginModal = function () {
        var inputs = {
            isMobile: false
        };
        this.modalService.init(LoginComponent, inputs, {});
    };
    HeaderComponent.prototype.initSignupModal = function () {
        var inputs = {
            isMobile: false
        };
        this.modalService.init(SignupComponent, inputs, {});
    };
    HeaderComponent.prototype.initTestiModal = function () {
        var inputs = {
            isMobile: false
        };
        this.modalService.init(TestformComponent, inputs, {});
    };
    HeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ModalService])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map