import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { ServiceService } from '../../../service/service.service';
import { Router } from '@angular/router';

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
   

  message: String;

  constructor(private ticketService: TicketService, private serviceService: ServiceService, private router: Router) { }

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
    this.ticket.userId = "5aaae408635549a46d59a051";
    this.ticketService.createTicket(this.ticket)
      .subscribe(
      (data:any) => {
        if(data) {
          console.log("return", data);
          if(data.err) {
            console.error(data.err);
            this.message = data.err;
          } else {
            this.router.navigate(['home']);
          }
        }
      }
    );
  }

}
