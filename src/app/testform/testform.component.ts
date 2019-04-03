import { Component, OnInit } from '@angular/core';
import { ModalService } from '../shared/services/modal.service';
import { Testimonial } from '../shared/models/testimonial.interface';
import { TestimodalService } from '../shared/services/testimodal.service';
import { finalize } from "rxjs/operators"
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-testform',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.css']
})
export class TestformComponent implements OnInit {

  constructor(private modalService: ModalService, private testimodalService:TestimodalService, private router :Router) { }

  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  testimonial : Testimonial;

  ngOnInit() {
    this.testimodalService.testimonialGet()
    .subscribe((testimonial: Testimonial) => {
      this.testimonial = testimonial;
    });
  }

  ifTestimonial(){
    if(this.testimonial==undefined){
      return false;
    }
    else{
      return true;
    }
  }

  close() {
    this.modalService.destroy();
  }

  createTestimonial({ value, valid }: { value: Testimonial, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.testimodalService.testimonialCreate(value.relationship, value.content)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['/testimonial'], { queryParams: { brandNew: true } });
            }
            this.modalService.destroy();
          },
          errors => this.errors = errors);

    }

  }

  editTestimonial({ value, valid }: { value: Testimonial, valid: boolean }){
    this.submitted = true; 
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.testimodalService.testimonialUpdate(value.relationship, value.content)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['/testimonial'], { queryParams: { brandNew: true } });
            }
            this.modalService.destroy();
          },
          errors => this.errors = errors);

    }
  }

}
