import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../utils/config.service';
import { HttpModule } from '@angular/http';
import { BaseService } from "./base.service";

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { map, catchError } from 'rxjs/operators'

//import * as _ from 'lodash';


@Injectable()

export class UserService extends BaseService {

  baseUrl: string = '';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: Http, private configService: ConfigService) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }

  register(username: string, password: string, firstName: string, lastName: string): Observable<Boolean> {
    let body = JSON.stringify({ firstName, lastName, username, password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + "/account", body, options)
      .pipe(map(res => true))
      .pipe(catchError(this.handleError))
  }

  login(userName, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        this.baseUrl + '/auth/login',
        JSON.stringify({ userName, password }), { headers }
      )
      .pipe(map((res: any) => res.json()))
      .pipe(map((res: any) => {
        localStorage.setItem('auth_token', res.auth_token);
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      }))
      .pipe(catchError(this.handleError));
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}

