import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import { Subscription, from } from 'rxjs';
import { MessagesService } from '../../services/messages.service'; // <1>
import { Room } from '../../models/room';
import { Message } from '../../models/message';
import { AuthService } from '../../services/auth.service';
import { User } from 'app/models/user';
import { ChatSelectionService } from 'app/services/chat-selection-service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-private.page.html',
  styleUrls: ['./chat-private.page.scss'],
})
export class ChatPrivatePage implements OnInit, OnDestroy {
  messages: Message[] = [];
  user: User;
  toUser: string;
  message = '';
  room: Room = {};

  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private socket: Socket,
              private toastCtrl: ToastController,
              public messagesService: MessagesService,
              private authService: AuthService,
              public chatSelectionServicve: ChatSelectionService) { }

  ngOnInit() {
    this.user = this.authService.currentUser;

    this.subscription = this.route.params.subscribe(params => {
      this.toUser = params.chatId; 

      this.messagesService.directChat({from:this.user.id,to:this.toUser}).subscribe((data)=>{        
      })
    });

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
    this.socket.emit('private-chat', {content: {text:this.message}, to:this.toUser});
    
    this.messagesService.message({
      content: {
        text: this.message,
        imoji: '',
        files: []
      }, sender: { name: this.user.name, id: this.user.id },
      to: undefined,
      status: '',
      timeSent: undefined,
      room: ''
    })
    this.message =''
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
