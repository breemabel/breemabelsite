import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from '../utils/config.service';
import { BaseService } from "./base.service";
import { BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
//import * as _ from 'lodash';
var UserService = /** @class */ (function (_super) {
    tslib_1.__extends(UserService, _super);
    function UserService(http, configService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.configService = configService;
        _this.baseUrl = '';
        // Observable navItem source
        _this._authNavStatusSource = new BehaviorSubject(false);
        // Observable navItem stream
        _this.authNavStatus$ = _this._authNavStatusSource.asObservable();
        _this.loggedIn = false;
        _this.loggedIn = !!localStorage.getItem('auth_token');
        // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
        // header component resulting in authed user nav links disappearing despite the fact user is still logged in
        _this._authNavStatusSource.next(_this.loggedIn);
        _this.baseUrl = configService.getApiURI();
        return _this;
    }
    UserService.prototype.register = function (username, email, password, firstName, lastName) {
        var body = JSON.stringify({ email: email, password: password, firstName: firstName, lastName: lastName, username: username });
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + "/account", body, options)
            .pipe(map(function (res) { return true; }))
            .pipe(catchError(this.handleError));
    };
    UserService.prototype.login = function (userName, password) {
        var _this = this;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(this.baseUrl + '/auth/login', JSON.stringify({ userName: userName, password: password }), { headers: headers })
            .pipe(map(function (res) { return res.json(); }))
            .pipe(map(function (res) {
            localStorage.setItem('auth_token', res.auth_token);
            _this.loggedIn = true;
            _this._authNavStatusSource.next(true);
            return true;
        }))
            .pipe(catchError(this.handleError));
    };
    UserService.prototype.logout = function () {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
    };
    UserService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    UserService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Http, ConfigService])
    ], UserService);
    return UserService;
}(BaseService));
export { UserService };
//# sourceMappingURL=user.service.js.map