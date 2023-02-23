import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';


export class JsonWebSocketSubject extends WebSocketSubject<any> {
  override next(value:any) {
    return super.next(JSON.stringify(value));
  }
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socketConnection$!: WebSocketSubject<{ message: string }>;
  public messages$!:Observable<any>;
 

  constructor() { 
    this.socketConnection$ = webSocket({url:'ws://localhost:10000',  deserializer: (event) => event.data});
    this.messages$ = this.socketConnection$.asObservable();
  }


  send(message:string){
    this.socketConnection$.next({message:message});
    
  }
}
