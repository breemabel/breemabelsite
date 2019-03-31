import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { ModalService } from "../shared/services/modal.service";
import { finalize } from "rxjs/operators";
import { SignupComponent } from '../signup/signup.component';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(userService, modalService, router, activatedRoute) {
        this.userService = userService;
        this.modalService = modalService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.submitted = false;
        this.credentials = { username: '', password: '' };
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscribe to router event
        this.subscription = this.activatedRoute.queryParams.subscribe(function (param) {
            _this.brandNew = param['brandNew'];
            _this.credentials.username = param['username'];
        });
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    };
    LoginComponent.prototype.close = function () {
        this.modalService.destroy();
    };
    LoginComponent.prototype.login = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.userService.login(value.username, value.password)
                .pipe(finalize(function () { return _this.isRequesting = false; }))
                .subscribe(function (result) {
                if (result) {
                    if (localStorage.getItem('redirect') != null) {
                        _this.router.navigate([localStorage.getItem('redirect')]);
                        localStorage.removeItem('redirect');
                    }
                    else {
                        _this.router.navigate(['/home']);
                    }
                }
            }, function (error) { return _this.errors = error; });
            this.modalService.destroy();
        }
    };
    LoginComponent.prototype.initSignupModal = function () {
        var inputs = {
            isMobile: false
        };
        this.modalService.init(SignupComponent, inputs, {});
    };
    LoginComponent.prototype.openSignup = function () {
        this.modalService.destroy();
        this.initSignupModal();
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [UserService, ModalService, Router, ActivatedRoute])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map