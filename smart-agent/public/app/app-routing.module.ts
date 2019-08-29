import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

const routes: Routes = [
  // CHATBOT URL SEARCH Content*_ + FAQ_Employee (debug)
  { path: '', component: ChatbotComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
