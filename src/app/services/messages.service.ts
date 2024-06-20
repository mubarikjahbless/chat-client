import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Message } from '../models/message';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private readonly URL = environment.apiUrl;
  private messages = []
private  messagesSubject = new BehaviorSubject(null)

public messages$ = this.messagesSubject.asObservable();

  constructor(private http: HttpClient, private socket: Socket) { 
    this.socket.on('message', (message:Message) =>{
      this.messages.push(message)
        this.messagesSubject.next(this.messages)
       }
      );
  }

  find(params?) {    
    return this.http.get<any>(this.URL+ 'messages', {params}).pipe(map((data)=>data.data));
  }

  directChat(params){
    return this.http.get<any>(this.URL+'direct-messages/'+params.sender+'/'+params.receiver).pipe(map((data)=>data.data))
  }
  public message(message:Message){
    this.messages.push(message)
   this.messagesSubject.next(this.messages)
  }
}
