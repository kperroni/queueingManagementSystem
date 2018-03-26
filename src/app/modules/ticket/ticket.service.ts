import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class TicketService {

  constructor(private http: HttpClient) { }

  createTicket(body){
    return this.http.post('ticket/createTicket', body);
  }

  getCurrentActiveTicket(){
    console.log("getting current ticket");
    return this.http.get('ticket/getCurrentTicket');
  }

  updateCurrentTicket(body){
    console.log("getting current ticket");
    return this.http.post('ticket/updateCurrentTicket', body);
  }

  getActiveTickets(){
    return this.http.get('/getActiveTickets');
  }
}
