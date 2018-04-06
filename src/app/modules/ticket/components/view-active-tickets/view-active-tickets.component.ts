import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-view-active-tickets',
  templateUrl: './view-active-tickets.component.html',
  styleUrls: ['./view-active-tickets.component.scss']
})
export class ViewActiveTicketsComponent implements OnInit {

  private activeTickets : any;

  constructor(private ticketService: TicketService,
              private userService: UserService) { }

  ngOnInit() {

    this.ticketService.getActiveTickets().subscribe(
      (data: any) => {
        this.activeTickets = data;
      },
      err => { console.error(err); }
    );
  }
}
