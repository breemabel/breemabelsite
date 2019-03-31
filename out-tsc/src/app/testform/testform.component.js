import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalService } from '../shared/services/modal.service';
import { TestimodalService } from '../shared/services/testimodal.service';
import { finalize } from "rxjs/operators";
import { Router } from '@angular/router';
var TestformComponent = /** @class */ (function () {
    function TestformComponent(modalService, testimodalService, router) {
        this.modalService = modalService;
        this.testimodalService = testimodalService;
        this.router = router;
        this.submitted = false;
    }
    TestformComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.testimodalService.testimonialGet()
            .subscribe(function (testimonial) {
            _this.testimonial = testimonial;
            console.log(testimonial);
        }, function (error) {
            //this.notificationService.printErrorMessage(error);
        });
    };
    TestformComponent.prototype.ifTestimonial = function () {
        if (this.testimonial == null) {
            return false;
        }
        else {
            return true;
        }
    };
    TestformComponent.prototype.close = function () {
        this.modalService.destroy();
    };
    TestformComponent.prototype.createTestimonial = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.testimodalService.testimonialCreate(value.relationship, value.content)
                .pipe(finalize(function () { return _this.isRequesting = false; }))
                .subscribe(function (result) {
                if (result) {
                    _this.router.navigate(['/testimonials'], { queryParams: { brandNew: true } });
                }
            }, function (errors) { return _this.errors = errors; });
            this.modalService.destroy();
        }
    };
    TestformComponent.prototype.editTestimonial = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        this.submitted = true;
        this.isRequesting = true;
        this.errors = '';
        if (valid) {
            this.testimodalService.testimonialUpdate(value.relationship, value.content)
                .pipe(finalize(function () { return _this.isRequesting = false; }))
                .subscribe(function (result) {
                if (result) {
                    _this.router.navigate(['/testimonials'], { queryParams: { brandNew: true } });
                }
            }, function (errors) { return _this.errors = errors; });
            this.modalService.destroy();
        }
    };
    TestformComponent = tslib_1.__decorate([
        Component({
            selector: 'app-testform',
            templateUrl: './testform.component.html',
            styleUrls: ['./testform.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ModalService, TestimodalService, Router])
    ], TestformComponent);
    return TestformComponent;
}());
export { TestformComponent };
//# sourceMappingURL=testform.component.js.map