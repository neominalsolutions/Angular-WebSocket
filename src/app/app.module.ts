import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebSocketService } from './web-socket.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      // subscribing establishes a connections
      useFactory: (ws: WebSocketService) => () => ws.messages$.subscribe(),
      deps: [WebSocketService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
