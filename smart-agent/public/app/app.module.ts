import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { HeaderComponent } from './components/header/header.component';
import { AppConfig } from './app-config';
import { ShortUrlPipe } from './short-url.pipe';
import { ShortDescriptionPipe } from './short-description.pipe';

/////////////////// FIREBASE DEPLOYMENT /////////////////////
import { AngularFireModule } from '@angular/fire';  
import { environment } from '../environments/environment';  
////////////////////////////////////////////////////////////

@NgModule({
  declarations: [
    AppComponent,
    ChatbotComponent,
    HeaderComponent,
    ShortUrlPipe,
    ShortDescriptionPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    // Firebase Deployment //
    AppRoutingModule,  
    AngularFireModule.initializeApp(environment.firebase)
    /////////////////////////
    
  ],
  providers: [AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
