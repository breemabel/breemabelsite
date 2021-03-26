import { Component } from '@angular/core';
import { ModalService } from '../app/shared/services/modal.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ImBrenanAngular';
  modalService :ModalService;

  removeModal() {
    this.modalService.destroy();
  }

  ngOnInit(){
/*     fetch("https://imbrenan.azurewebsites.net/api/auth/check", {method:"GET", mode:"cors", headers:{"Authorization": `Bearer ${localStorage.getItem("auth_token")}`}})
    .then(function(response){
      if(response.status==401)
      {
        localStorage.removeItem("auth_token");
      }
    }) */
  }
}
