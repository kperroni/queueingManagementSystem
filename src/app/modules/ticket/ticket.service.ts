import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable()
export class TicketService {

  constructor(private http: HttpClient, private userService: UserService) { }

  createTicket(body) {
    return this.http.post('ticket/createTicket', body);
  }

  getActiveTickets() {
    return this.http.get('ticket/getActiveTickets');
  }

  getActiveTicketsInQueue(body) {
    return this.http.post('ticket/getActiveTicketsInQueue', body);
  }

  viewPrecedingTickets(body) {
    return this.http.post('ticket/viewPrecedingTickets', body);
  }

  getCurrentActiveTicket(body) {
    console.log('getting current ticket');
    return this.http.post('ticket/getCurrentTicket', body);
  }

  updateCurrentTicket(body) {
    console.log('getting current ticket');
    return this.http.post('ticket/updateCurrentTicket', body);
  }

  getStudentTicket(body) {
    return this.http.post('ticket/getStudentTicket', body);
  }

  getTicketByTicketNumber(ticketNumber) {
    return this.http.post('ticket/getTicketByTicketNumber', ticketNumber);
  }
}
