import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RoomsService } from '../../services/rooms.service';
import { ChatModelService } from '../../services/chat/chat-manager-service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public users =  []
  public rooms = []

  constructor(
    private readonly authService:AuthService, 
    private readonly roomService: RoomsService,
    private readonly chatModelService: ChatModelService,
   private readonly socket: Socket) {
    this.getAllRooms();
    this.getAllUsers();

    
   }

  private getAllUsers(){
    this.authService.getUsers().subscribe((users)=>{
     this.users = users
    })
   }

   private getAllRooms(){
    this.roomService.find().subscribe(rooms => {this.rooms = rooms
    });
   }

   onChatSelected(selectedChat){      
    // this.socket.emit('enter-chat-channel', {name:selectedChat.name, channelId:selectedChat._id })  
    const selectedChatName = this.authService.currentUser.id===selectedChat._id? 'self': selectedChat.name
  this.chatModelService.getModel().selectedChat = {name:selectedChatName,id:selectedChat._id, type:'private'}
   }

   onSelectedChannel(selectedChat){      
    this.socket.emit('enter-chat-channel', {name:selectedChat.name, channelId:selectedChat._id })  
  this.chatModelService.getModel().selectedChat = {name:selectedChat.name,id:selectedChat._id, type:'channel'}
   }

}
