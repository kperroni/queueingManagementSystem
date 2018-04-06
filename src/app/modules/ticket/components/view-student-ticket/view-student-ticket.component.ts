import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-view-student-ticket',
  templateUrl: './view-student-ticket.component.html',
  styleUrls: ['./view-student-ticket.component.scss']
})
export class ViewStudentTicketComponent implements OnInit {

  private activeTickets: any;
  private activeStudent: any;

  constructor(private ticketService: TicketService,
    private userService: UserService) { }

  ngOnInit() {

    this.activeStudent = this.userService.getActiveUser();

    this.activeStudent = this.activeStudent.type == 'S' ? this.activeStudent : null;

    this.ticketService.getStudentTicket(this.activeStudent).subscribe(
      (data: any) => {
        this.activeTickets = data;
      },
      err => { console.error(err); }
    );
  }

}
