import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ConfigService } from '../../shared/utils/config.service';

import { BaseService } from '../../shared/services/base.service';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { Event } from '../models/event.interface' ;

//import * as _ from 'lodash';

@Injectable()

export class CalendarService extends BaseService {

    baseUrl: string = '';

    constructor(private http: Http, private configService: ConfigService) {
        super();
        this.baseUrl = configService.getApiURI();
    }

    eventGetAll(): Observable<Event> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/vnd.bizzabo.v2.0+json');
        let authToken = 'b2f9b657-d8fd-4c34-a28b-eba13cab25c2';
        headers.append('Authorization', `Bearer ${authToken}`);
        return this.http.get("https://api.bizzabo.com/api/events")
            .pipe(map(response => response.json()))
            .pipe(catchError(this.handleError));
    }
}