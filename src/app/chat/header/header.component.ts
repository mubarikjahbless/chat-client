import { Component } from '@angular/core';
import { ChatModelService } from '../../services/chat/chat-manager-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  infoOpen = false; // Info sidebar is closed by default

  constructor(public readonly chatModelService:ChatModelService) { }
  toggleInfo() {
    this.infoOpen = !this.infoOpen;
  }

}
