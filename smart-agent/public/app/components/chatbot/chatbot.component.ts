import { Component, OnInit } from '@angular/core';
import { ChatbotService } from 'src/app/services/chatbot.service';
import { Subject } from 'rxjs';

export class Chat {
  message: any;
  isMe: boolean;
  type: string;
  inputMessageTime: Date;

  constructor(message: string, isMe: boolean, type: string) { }
}
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  public show:boolean = false;


  ///// SHOW MORE & LESS BUTTON  ///
  startPage: Number;
  paginationLimit: Number;

  ///////////////////////////////// 


  //////// CHATBOT SECTION //////
  conversation = new Subject<Chat[]>();
  chats: Chat[] = [];
  message: string;
  ////////////////////////////////


  debug_data: any = [];

  constructor(private chatbotService: ChatbotService) {
    this.startPage = 0;
    this.paginationLimit = 3;

  }

  ngOnInit() {
    // Display Welcome message in the Smart Agent Portal
    let userMessage_default = { message: '', isMe: false, type: '' }
    let chatbotMessage_default = {
      //message: ["Welcome to Smart Agent Portal! My name is KBTG bot, I'm here to help you. Feel free to ask anything of your interest, but limited to our services and products. :)"],
    
      message:  
      [{ "widget_type": "welcome",
          "answer": "Welcome to KBank Smart Agent Portal. I’m your Knowledge Bot. You can ask me any question or search our KM!"
      }],
      
      isMe: false,
      type: 'bot'
    }
    

    /*
    setTimeout(() => {
      this.chats = [userMessage_default, chatbotMessage_default]
    }, 1500);
    */

   // this.chats = [userMessage_default, chatbotMessage_default]

    this.conversation.subscribe((val) => {
      this.chats = this.chats.concat(val);
    });

  }


  sendMessage() {
    this.getBotAnswer(this.message);
    this.message = '';
  }

  getBotAnswer(msg: string) {

    let userInputTime: Date = new Date();
    let userMessage = { message: msg, isMe: true, type: 'user', inputMessageTime: userInputTime }
    this.conversation.next([userMessage]);

    this.chatbotService.sendMessage(this.message).then(data => {
      console.log("JSON DATA: " + JSON.stringify(data))
      data["answer"].map(data => {

        switch(data["widget_type"]) {
          case "faq": {
            let bot_message_widget_type = {
              "widget_type": data["widget_type"],
              "results": data["results"]
            }

            let chatbotInputTime: Date = new Date();
            const bot_message = { message: bot_message_widget_type, isMe: false, type: 'bot', inputMessageTime: chatbotInputTime };
            console.log("bot_message_faq_widget: " + JSON.stringify(bot_message));
            this.conversation.next([bot_message])
            break;
          }

          case "page" : {
            let bot_message_page_widget = {
              "widget_type": data["widget_type"],
              "results": data["results"]
            }
            
            let chatbotInputTime: Date = new Date();
            const bot_message = { message: bot_message_page_widget, isMe: false, type: 'bot', inputMessageTime: chatbotInputTime };
            console.log("bot_message_page_widget: " + JSON.stringify(bot_message));
            this.conversation.next([bot_message])
            break;
          }

          case "error": {

            let chatbotInputTime: Date = new Date();

            let bot_message_page_widget = {
              "widget_type": data["widget_type"],
              "results": data["results"]
            }

            const bot_message = { message: bot_message_page_widget, isMe: false, type: 'bot', inputMessageTime: chatbotInputTime };
            //console.log("bot_error_page_widget: " + JSON.stringify(bot_message));
            this.conversation.next([bot_message])
            break;
          }
              
        }
        
              
      })

      //botMessage = { message: data['answer'], isMe: false, type: 'bot' };
      //this.conversation.next([botMessage]);
      /*
      setTimeout(() => {
        this.conversation.next([botMessage]);
      }, 500);
      */

    });

  }


  showMore() {
    this.paginationLimit = Number(this.paginationLimit) + 3;
  }
  showLess() {
    this.paginationLimit = Number(this.paginationLimit) - 3;
  }

  toggle() {
    this.show = !this.show;
  }

  showMenu() {
    this.show = !this.show;
  }


}