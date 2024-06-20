import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../models/room';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) { }

  find(params?) {
    return this.http.get<any>(environment.apiUrl + 'channels/', { params }).pipe(map((data)=>{      
      return data.data}));
  }

  findById(id: string) {
    return this.http.get<any>(environment.apiUrl + 'channels/' + id).pipe(map((data)=>data.data));
  }

  save(item: Room) {    
    return this.http.post<any>(environment.apiUrl + 'channels/', item).pipe(map((data)=>data));
  }
}
