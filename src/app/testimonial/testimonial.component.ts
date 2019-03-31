import { Component, OnInit } from '@angular/core';
import { TestimodalService } from '../shared/services/testimodal.service';
import { TestimonialDetails } from '../shared/models/testimonial.details.interface';
import { RouterLinkWithHref } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  testimonial : any;
  constructor(private testimodalService:TestimodalService) { }

  ngOnInit() {
    this.testimodalService.testimonialGetAll()
    .subscribe(response => {
      this.testimonial = response;
      let count = 0;
      this.testimonial.forEach(element => {

        if(element.approved == "1"){
          let row = document.createElement('row');
          let div1 = document.createElement('div');
          let div2 = document.createElement('div');
          let div3 = document.createElement('div');
          let p1 = document.createElement('p')
          div1.className = "col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3";
          div2.className = "card";
          div3.className = "card-block";
  
          div2.style.padding = "1rem";
          div2.style.border = "solid";
          div2.style.borderWidth = "2px";
          div2.style.borderColor = "lightgray";
          div2.style.marginBottom = "1rem";
          div2.style.webkitTransition = ".5s all ease";
          div2.style.transition = ".5s all ease";
          div2.style.boxShadow = "7px 7px 30px -5px rgba(0,0,0,0.6);";
          div2.style.backgroundColor = "rgb(0,0,0,0.2)";
          div2.style.color = "white";
          div2.style.fontWeight = "bold";
          div2.style.fontSize = "6";
          
          
  
          p1.className = "card-text";
          p1.innerHTML = "\"" + element.content + "\"" + "<br>" + "-" + element.name + " - " + element.relationship;
          
          div3.appendChild(p1);
          div2.appendChild(div3);
          div1.appendChild(div2);
  
          if(count < 4){
            document.getElementById("row1").appendChild(div1)
          }
          else if (count >= 4 && count < 8){
            document.getElementById("row2").appendChild(div1)
          }
          else if( count >= 9 && count < 12){
            document.getElementById("row3").appendChild(div1)
          }

  
          count++;
        }
      
      });
    }, error => {
      console.log(error);
    });
  }
  
  
}