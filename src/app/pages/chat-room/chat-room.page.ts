import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MessagesService } from '../../services/messages.service';
import { RoomsService } from '../../services/rooms.service';
import { Room } from '../../models/room';
import { Message } from '../../models/message';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit, OnDestroy {
  messages: Message[] = [];
  nickname = '';
  message = '';
  room: Room = {};

  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private socket: Socket,
              private toastCtrl: ToastController,
              private messagesService: MessagesService,
              private roomsService: RoomsService,
              private authService: AuthService) { } 
  ngOnInit() {
    this.nickname = this.authService.currentUser.name;     
    this.subscription = this.route.params.subscribe(params => {
      const roomId = params.chatId; 
      this.socket.emit('enter-chat-room', roomId);       
      this.socket.on('reconnect', () => this.socket.emit('enter-chat-room', roomId)); 
      this.roomsService.findById(roomId).subscribe(room => {         
        this.room = room;                 
        this.messagesService.find({where: JSON.stringify({room: this.room._id})}).subscribe(messages => {
          this.messages = messages; 
        });
      });
    });

    this.socket.on('message', message => this.messages.push(message));
    this.socket.on('user-connected',(user)=>{
      
    })
    this.socket.on('users-changed', data => {
      const user = data.user;
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });

  }

  ngOnDestroy() { 
    this.subscription.unsubscribe();
    this.socket.removeAllListeners('message');
    this.socket.removeAllListeners('users-changed');
    this.socket.removeAllListeners('reconnect');
    this.socket.emit('leave-chat-room', this.room._id);
  }

  sendMessage() {
    this.socket.emit('add-message', { content:{text: this.message}, room: this.room._id}); 
    this.message = '';
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
