import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/room';
import { RoomsService } from '../../services/rooms.service';
import { debounceFn } from 'debounce-decorator-ts';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { User } from 'app/models/user';
import { Socket } from 'ngx-socket-io';
import { ChatSelectionService } from 'app/services/chat-selection-service';

@Component({
  selector: 'app-select-room',
  templateUrl: './select-room.page.html',
  styleUrls: ['./select-room.page.scss'],
})
export class SelectRoomPage implements OnInit {

  rooms: Room[];

  roomName: string;
  allUsers: User[]= [];

  constructor(private roomsService: RoomsService,
              private navController: NavController,
              private socket: Socket,
              public authSvc: AuthService,
              public chatSelectionService: ChatSelectionService) { 
                this.getAllUsers()
              } 

  ngOnInit() {
    this.searchRoom('');
    // this.socket.on('user-connected',(user)=>{
    //   this.allUsers=user              
    // })
  }

  @debounceFn(500)
  searchRoom(q: string) { 
    const params: any = {};
    if (q) { params.q = q; }
    this.roomsService.find(params).subscribe(rooms => {this.rooms = rooms});
  }

  joinRoom(room: Room) { 
    this.navController.navigateRoot('chat-room/' + room._id);
  }

  chatPrivately(user: User){
    this.chatSelectionService.setSelectedChat({name:user.name, id:user.id})        
    this.navController.navigateRoot('chat-private/' + user.id)
  }

  addRoom() {     
    this.roomsService.save({name: this.roomName}).subscribe(room => {
      this.roomName = '';
      this.rooms.push(room);
    });
  }

  private getAllUsers(){
   this.authSvc.getUsers().subscribe((users)=>{
    this.allUsers = users
   })
  }
}
