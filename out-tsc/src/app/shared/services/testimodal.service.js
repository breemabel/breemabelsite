import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from '../../shared/utils/config.service';
import { BaseService } from '../../shared/services/base.service';
import { map, catchError } from 'rxjs/operators';
//import * as _ from 'lodash';
var TestimodalService = /** @class */ (function (_super) {
    tslib_1.__extends(TestimodalService, _super);
    function TestimodalService(http, configService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.configService = configService;
        _this.baseUrl = '';
        _this.baseUrl = configService.getApiURI();
        return _this;
    }
    TestimodalService.prototype.testimonialCreate = function (relationship, content) {
        var body = JSON.stringify({ relationship: relationship, content: content });
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', "Bearer " + authToken);
        var options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + "/testimonials/post", body, options)
            .pipe(map(function (res) { return true; }))
            .pipe(catchError(this.handleError));
    };
    TestimodalService.prototype.testimonialUpdate = function (relationship, content) {
        var body = JSON.stringify({ relationship: relationship, content: content });
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', "Bearer " + authToken);
        var options = new RequestOptions({ headers: headers });
        return this.http.put(this.baseUrl + "/testimonials/put", body, options)
            .pipe(map(function (res) { return true; }))
            .pipe(catchError(this.handleError));
    };
    TestimodalService.prototype.testimonialGet = function () {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', "Bearer " + authToken);
        return this.http.get(this.baseUrl + "/testimonials/get", { headers: headers })
            .pipe(map(function (response) { return response.json(); }))
            .pipe(catchError(this.handleError));
    };
    TestimodalService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Http, ConfigService])
    ], TestimodalService);
    return TestimodalService;
}(BaseService));
export { TestimodalService };
//# sourceMappingURL=testimodal.service.js.map