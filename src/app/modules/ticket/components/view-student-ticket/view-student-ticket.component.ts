import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';

@Component({
  selector: 'app-view-student-ticket',
  templateUrl: './view-student-ticket.component.html',
  styleUrls: ['./view-student-ticket.component.scss']
})
export class ViewStudentTicketComponent implements OnInit {

  private activeTickets : any;

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.ticketService.getStudentTicket().subscribe(
      (data: any) => {
        this.activeTickets = data;
      },
      err => { console.error(err); }
    );
  }

}
