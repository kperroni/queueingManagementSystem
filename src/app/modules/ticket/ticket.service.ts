import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class TicketService {

  constructor(private http: HttpClient) { }

  createTicket(body){
    return this.http.post('ticket/createTicket', body);
  }

  getActiveTickets(){
    return this.http.get('/getActiveTickets');
  }
}
