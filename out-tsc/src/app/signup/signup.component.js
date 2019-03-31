import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { finalize } from "rxjs/operators";
import { ModalService } from '../shared/services/modal.service';
import { LoginComponent } from '../login/login.component';
var SignupComponent = /** @class */ (function () {
    function SignupComponent(userService, router, modalService) {
        this.userService = userService;
        this.router = router;
        this.modalService = modalService;
        this.submitted = false;
    }
    SignupComponent.prototype.ngOnInit = function () {
    };
    SignupComponent.prototype.close = function () {
        this.modalService.destroy();
    };
    SignupComponent.prototype.registerUser = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.userService.register(value.email, value.username, value.password, value.firstName, value.lastName)
                .pipe(finalize(function () { return _this.isRequesting = false; }))
                .subscribe(function (result) {
                if (result) {
                    _this.router.navigate(['/login'], { queryParams: { brandNew: true, email: value.email } });
                }
            }, function (errors) { return _this.errors = errors; });
            this.modalService.destroy();
            this.initLoginModal();
        }
    };
    SignupComponent.prototype.initLoginModal = function () {
        var inputs = {
            isMobile: false
        };
        this.modalService.init(LoginComponent, inputs, {});
    };
    SignupComponent.prototype.openLogin = function () {
        this.modalService.destroy();
        this.initLoginModal();
    };
    SignupComponent = tslib_1.__decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, Router, ModalService])
    ], SignupComponent);
    return SignupComponent;
}());
export { SignupComponent };
//# sourceMappingURL=signup.component.js.map