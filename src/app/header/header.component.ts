import { Component, OnInit } from '@angular/core';
import { ModalService} from '../shared/services/modal.service'
import {LoginComponent} from '../login/login.component'
import {SignupComponent} from '../signup/signup.component'
import { TestformComponent } from '../testform/testform.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private modalService:ModalService) { }

  ngOnInit() {
  }

  readLocalStorageValue() {
    if(localStorage.getItem("auth_token") != null){
      return true;
    }
    return false;
  }

  logoff(){
    localStorage.removeItem("auth_token");
  }

  initLoginModal() {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(LoginComponent, inputs, {});
  }

  initSignupModal() {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(SignupComponent, inputs, {});
  }

  initTestiModal() {
    let inputs = {
      isMobile: false
    }
    this.modalService.init(TestformComponent, inputs, {});
  }
  
}
