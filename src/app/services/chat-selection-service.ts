import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatSelectionService {
  private allUsers = []
private selectedUserOrGroupSubject = new BehaviorSubject({name:null,id:''});
private allUsersSubject = new BehaviorSubject<any[]>(null);
public selectedUserOrGroup$ = this.selectedUserOrGroupSubject.asObservable()
public allUsers$ = this.allUsersSubject.asObservable()
  constructor(private socket: Socket,private route: ActivatedRoute,) { 
   
    this.socket.on('user-connected',(users)=>{
     this.allUsers = users
     this.allUsersSubject.next(this.allUsers)
    })

    this.route.params.subscribe((params)=>{
      const id = params.chatId;      
      if(id){
       this.findUser(id)
      }
    })
  } 


public setSelectedChat(selected:{name:string, id:string}){
  this.findUser(selected.id)
}

private findUser(id:string){
  const user = this.allUsers.find((user)=>user.id===id)
  this.selectedUserOrGroupSubject.next({name:user.name, id:user.id})
}
 }
