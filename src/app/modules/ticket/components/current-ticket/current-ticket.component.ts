import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../../shared/services/messages/message.service';
import { ToasterService } from 'angular5-toaster';

@Component({
  selector: 'app-current-ticket',
  templateUrl: './current-ticket.component.html',
  styleUrls: ['./current-ticket.component.scss']
})
export class CurrentTicketComponent implements OnInit {

  private currentTicket: any;
  private stringMsg: any;

  constructor(private ticketService: TicketService, private router: Router,
    private message: MessageService, private toaster: ToasterService) { }

  ngOnInit() {

    if(this.message.getMessage().clear === "0"){   
      let toastMessage = this.message.getMessage();
      this.toaster.pop(toastMessage.type, toastMessage.title, toastMessage.body);
      this.message.clearMessage();
    }
    
    this.ticketService.getCurrentActiveTicket().subscribe(
      (data: any) => {
        this.stringMsg = data.message;
        switch (this.stringMsg) {
          case '0':
            this.currentTicket = null;
            console.log("Some error occured!");
          case '1':
            this.currentTicket = data.ticket[0];
            console.log(this.currentTicket);
        }
      },
      err => { console.error(err); }
    );
  }

  onClickUpdateTicket() {
    //TODO: update ticket and change status
    this.ticketService.updateCurrentTicket(this.currentTicket)
      .subscribe(
        (data: any) => {
          this.stringMsg = data.message;
          this.currentTicket = data.ticket;
          console.log("data", data);
          switch (this.stringMsg) {
            case '0': {
              this.toaster.pop('error', 'Qme', 'Something went wrong, ticket update failed.');
              break;
            }
            case '1': {
              console.log("message = 1");
              this.message.clearMessage();
              this.message.setMessage('success', 'Qme', 'The ticket number ' + this.currentTicket.ticketNumber +
                ' was successfully updated with new status of \'' + this.currentTicket.status + '\'!');
              this.router.navigate(['/home']);
              break;
            }
          }
        },
        err => { console.error(err); }
      );
  }
}
