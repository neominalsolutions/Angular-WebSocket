import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebSocketService } from './web-socket.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  providers: [
    {
      provide: APP_INITIALIZER, // uygulama ilk açılı injection_token
      multi: true,
      // connection açtık
      useFactory: (ws: WebSocketService) => () => ws.messages$.subscribe(), // tek bir instance ile subscribe
      // bir önceki connection değerlerini kaybetmemek için subscribe olduk
      deps: [WebSocketService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
