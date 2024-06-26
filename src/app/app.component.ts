import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private socket: Socket,
  ) {
  }

  ngOnInit(): void {
    this.socket.on('error', async error => {
      console.log('error', error);
      
    });

  }
}
