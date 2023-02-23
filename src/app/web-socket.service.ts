import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export interface Message {
  source: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socketConnection$!: WebSocketSubject<Message>;
  public messages$!: Observable<Message>;

  constructor() {
    this.socketConnection$ = webSocket({
      url: 'ws://localhost:5000',
    });
    this.messages$ = this.socketConnection$.asObservable();
  }

  send(message: Message) {
    console.log('message', message);
    this.socketConnection$.next(message);
  }
}
