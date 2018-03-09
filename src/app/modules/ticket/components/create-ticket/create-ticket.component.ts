import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  ticketId: String;
  service: String;
  subject: String;
  description: String;
  message: String;

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
  }

  onClickCreateTicket(){
   this.ticketService.createTicket({ticketId: this.ticketId, service:this.service,
                                     subject: this.subject, description:this.description})
      .subscribe(
      (data:any) => {
        this.message = data;
        console.log("return", this.message);
      },
      err => {console.error(err);}
    );
  }

}
