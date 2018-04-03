import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from '../user/user.service'

@Injectable()
export class TicketService {

  constructor(private http: HttpClient,
              private userService : UserService) { }

  createTicket(body) {
    return this.http.post('ticket/createTicket', body);
  }

  getActiveTickets() {
    return this.http.get('ticket/getActiveTickets');
  }

  getPrecedingTickets(activeStudent) {
    return this.http.post('ticket/getPrecedingTickets',activeStudent);
  }
}
