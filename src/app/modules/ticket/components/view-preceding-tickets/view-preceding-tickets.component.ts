import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-view-preceding-tickets',
  templateUrl: './view-preceding-tickets.component.html',
  styleUrls: ['./view-preceding-tickets.component.scss']
})
export class ViewPrecedingTicketsComponent implements OnInit {

  private precedingTickets : any;
  private activeStudent : any;

  constructor(private ticketService: TicketService,
    private userService: UserService) { }

  ngOnInit() {

    this.activeStudent = this.userService.getActiveUser();

    this.activeStudent = this.activeStudent.type == 'S'? this.activeStudent : null;


    this.ticketService.getPrecedingTickets().subscribe(
      (data: any) => {
        this.precedingTickets = data;
      },
      err => { console.error(err); }
    );
  }

}
