import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Credentials } from '../shared/models/credentials.interface';
import { UserService } from '../shared/services/user.service';
import { ModalService } from "../shared/services/modal.service";

import { finalize } from "rxjs/operators";
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials: Credentials = { username: '', password: '' };

  constructor(private userService: UserService, private modalService: ModalService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.brandNew = param['brandNew'];
        this.credentials.username = param['username'];
      });

  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  public close() {
    this.modalService.destroy();
  }

  login({ value, valid }: { value: Credentials, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.login(value.username, value.password)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe(
          result => {
            if (result) {
              if (localStorage.getItem('redirect') != null) {
                this.router.navigate([localStorage.getItem('redirect')]);
                localStorage.removeItem('redirect');
              }
              else {
                this.modalService.destroy();
                this.router.navigate(['/home']);
              }
            }
          },
          error => this.errors = error);
    }

  }

  initSignupModal(){
    let inputs = {
      isMobile: false
    }
    this.modalService.init(SignupComponent, inputs, {});
  }

  openSignup(){
    this.modalService.destroy();
    this.initSignupModal();
  }

}
