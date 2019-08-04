import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  // CHATBOT SEARCH SMART AGENT PORTAL (content_* + faq_*)
  sendMessage(message: string) {
    return new Promise((resolve, reject) => {
        this.http.get(this.appConfig.apiUrl + "/api/search/smart-agent-portal/search/" + message).subscribe(data => {
        resolve(data)
      },
        error => {
          reject(error);
        });
    });
  }
}
