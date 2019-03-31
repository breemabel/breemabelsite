import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from '../../shared/utils/config.service';
import { BaseService } from '../../shared/services/base.service';
import { map, catchError } from 'rxjs/operators';
//import * as _ from 'lodash';
var ProfileService = /** @class */ (function (_super) {
    tslib_1.__extends(ProfileService, _super);
    function ProfileService(http, configService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.configService = configService;
        _this.baseUrl = '';
        _this.baseUrl = configService.getApiURI();
        return _this;
    }
    ProfileService.prototype.getProfileDetails = function () {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', "Bearer " + authToken);
        return this.http.get(this.baseUrl + "/profile/get", { headers: headers })
            .pipe(map(function (res) { return res.json(); }))
            .pipe(catchError(this.handleError));
    };
    ProfileService.prototype.updateProfile = function (firstName, lastName, phoneNumber, pictureUrl) {
        var body = JSON.stringify({ firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, pictureUrl: pictureUrl });
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', "Bearer " + authToken);
        var options = new RequestOptions({ headers: headers });
        return this.http.put(this.baseUrl + "profile/update", body, options)
            .pipe(map(function (res) { return res.json; }))
            .pipe(catchError(this.handleError));
    };
    ProfileService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Http, ConfigService])
    ], ProfileService);
    return ProfileService;
}(BaseService));
export { ProfileService };
//# sourceMappingURL=profile.service.js.map