import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';

@Component({
  selector: 'app-view-active-tickets',
  templateUrl: './view-active-tickets.component.html',
  styleUrls: ['./view-active-tickets.component.scss']
})
export class ViewActiveTicketsComponent implements OnInit {

  private activeTickets : any;

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
  }

  getActiveTickets(body){
    this.activeTickets = this.ticketService.getActiveTickets(body);
   } 

}
