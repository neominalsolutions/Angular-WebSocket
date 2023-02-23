import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  message!:string;
  messages:string[] = [];

  constructor(private socketService:WebSocketService) {
    this.socketService.messages$.subscribe({next:(message:any) => {
      this.messages.push(message);
    }})
  }

  ngOnInit(): void {
 
  }

  sendMessage(){
    this.socketService.send(this.message);
  }
}
