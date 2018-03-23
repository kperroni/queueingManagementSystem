import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { ServiceService } from '../../../service/service.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../../shared/services/messages/message.service';
import { ToasterService } from 'angular5-toaster';


@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  // we don't need it for creation
  // ticketNunmber: String;

  ticket: any = {
    ticketNumber: Number,
    serviceId: String,
    subject: String,
    description: String,
    weight: Number,
    status: String,
    userId: String,
    creationTime: Date,
  }

  services: any[]; // Eventually it should be an array of User (Class)
  error: any;
   
  constructor(private ticketService: TicketService, private serviceService: ServiceService, private router: Router, 
    private message: MessageService, private toaster: ToasterService) { }

  ngOnInit() {
    this.serviceService.getServices()
    .subscribe(
      (data:any[]) => {
        this.services = data;
      },
      err => {console.error(err)}
    );
    this.ticket.subject = "";
    this.ticket.description = "";
  }
  
  onClickCreateTicket(){
    this.ticketService.createTicket(this.ticket)
      .subscribe(
        (data: any) => {
          let creationResult = data;
          console.log("data", data);
          switch (creationResult.message) {
            case '0': {
              this.toaster.pop('error', 'Qme', 'Missing information. Please try again');
              break;
            }
            case '1': {
              console.log("message = 1");
              this.message.clearMessage();
              this.message.setMessage('success', 'Qme', 'The ticket number ' + creationResult.ticketNumber + ' was successfully created!');
              this.router.navigate(['/home']);
              break;
            }
          }
        },
        err => { console.error(err); }
      );
  }

}
