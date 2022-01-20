import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages!: string[];

  constructor() { 
    this.messages = [];
  }

  newMessage(message: string){
    this.messages.unshift(message);
    this.messages = this.messages.slice(0,2);
  }

  clearMessages(){
    this.messages = [];
  }
}
