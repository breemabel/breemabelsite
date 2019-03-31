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
}
