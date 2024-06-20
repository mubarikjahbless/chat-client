import { Component, OnInit } from '@angular/core';
import { ChatModelService } from '../../services/chat/chat-manager-service';
import { SelectedChat } from '../../domain';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Socket } from 'ngx-socket-io';
import { Message } from '../../models/message';
import { MessagesService } from '../../services/messages.service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css']
})
export class ChatAreaComponent implements OnInit{
  #currentSelectedChat: SelectedChat;
  openChat=false;
  messages: Message[] = [];

  public message=''
  constructor(
    private readonly chatModelService: ChatModelService,
    private socket: Socket,
    private messagesService: MessagesService,
    public authService: AuthService
  ) {
    this.chatModelService.modelChanged$.pipe(map((model)=>model.selectedChat), takeUntilDestroyed()).subscribe((selectedChat)=>{
      this.#currentSelectedChat=selectedChat
      this.messages = [];      
     this.openChat= !!selectedChat.id 
     if(selectedChat.type==='channel'){
       this.messagesService.find({chatId: this.#currentSelectedChat.id}).subscribe(messages => {
         this.messages = messages;         
       });

     }
     if(selectedChat.type==='private'){
       this.messagesService.directChat({receiver: this.#currentSelectedChat.id, sender: this.authService.currentUser.id}).subscribe(messages => {
         this.messages = messages;         
       });
     }
    })
   }
  ngOnInit(): void {
    
    this.socket.on('message', message =>{      
      this.messages.push(message)
    });
    
  }
  infoOpen = false;

  onSendMessage(){
    if(this.#currentSelectedChat.type==='channel'){      
      this.socket.emit('group-message',{content:{text: this.message}, chatId:this.#currentSelectedChat.id})
      }
      if(this.#currentSelectedChat.type==='private'){      
      this.socket.emit('private-message', { content:{text: this.message}, to: this.#currentSelectedChat.id}); 
    }
    this.message = '';
  }
}
