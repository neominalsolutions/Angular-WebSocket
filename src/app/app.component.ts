import { Component, OnInit } from '@angular/core';
import { Message, WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  message!: string;
  messages: string[] = [];

  constructor(private socketService: WebSocketService) {
    this.socketService.messages$.subscribe({
      next: (message: Message) => {
        console.log('message', message);
        this.messages.push(message.content);
      },
    });
  }

  ngOnInit(): void {
    const worker = new Worker(new URL('./report.worker', import.meta.url));

    worker.postMessage('hello');

    worker.onmessage = ({ data }) => {
      console.log(`page got message: ${data}`);
    };
  }

  sendMessage() {
    this.socketService.send({ content: this.message, source: 'localhost' });
  }
}
