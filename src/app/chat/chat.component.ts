import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
public last=false

  constructor() { }

  isSidenavOpen = true; // Sidebar is open by default
  infoOpen = false; // Info sidebar is closed by default
  incomingMessages = ['Incoming message 1', 'Incoming message 2'];
  outgoingMessages = ['Outgoing message 1', 'Outgoing message 2'];

  toggleInfo() {
    this.infoOpen = !this.infoOpen;
  }

  logout() {
    //TO DO: implement logout    
    }

}
