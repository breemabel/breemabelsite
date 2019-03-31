import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserRegistration } from '../shared/models/user.registration.interface';
import { UserService } from '../shared/services/user.service';

import { finalize } from "rxjs/operators"
import { ModalService } from '../shared/services/modal.service';
import {LoginComponent} from '../login/login.component'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;

  constructor(private userService: UserService, private router: Router, private modalService:ModalService) {

  }

  ngOnInit() {

  }

  public close() {
    this.modalService.destroy();
  }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.register(value.username, value.password, value.firstName, value.lastName)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['/login'], { queryParams: { brandNew: true, username: value.username } });
              this.modalService.destroy();
              this.initLoginModal();
            }
          },
          errors => this.errors = errors);
    }

  }

  initLoginModal() {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(LoginComponent, inputs, {});
  }

  openLogin(){
    this.modalService.destroy();
    this.initLoginModal();
  }

}