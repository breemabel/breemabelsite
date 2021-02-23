import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ProfileDetails } from '../models/profile.details.interface';
import { ConfigService } from '../../shared/utils/config.service';

import { BaseService } from '../../shared/services/base.service';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { Testimonial } from '../models/testimonial.interface';
import { TestimonialDetails } from '../models/testimonial.details.interface';

//import * as _ from 'lodash';

@Injectable()

export class TestimodalService extends BaseService {

    baseUrl: string = '';

    constructor(private http: Http, private configService: ConfigService) {
        super();
        this.baseUrl = configService.getApiURI();
    }

    testimonialCreate(relationship, content): Observable<boolean> {
        let body = JSON.stringify({ relationship, content });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + "/testimonials/post", body, options)
            .pipe(map(res => true))
            .pipe(catchError(this.handleError))
    }

    testimonialUpdate(relationship, content): Observable<boolean> {
        let body = JSON.stringify({ relationship, content });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.baseUrl + "/testimonials/put", body, options)
            .pipe(map(res => true))
            .pipe(catchError(this.handleError))
    }

    testimonialGet(): Observable<Testimonial> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http.get(this.baseUrl + "/testimonials/get", { headers })
            .pipe(map(response => response.json()))
            .pipe(catchError(this.handleError));
    }

    testimonialGetAll(): Observable<TestimonialDetails> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.get("https://www.json-generator.com/api/json/get/cekDFLUlTS?indent=2")
            .pipe(map(response => response.json()))
            .pipe(catchError(this.handleError));
    }
}
