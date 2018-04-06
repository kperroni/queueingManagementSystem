import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { UserService } from '../../../user/user.service';
import { StudentService } from '../../../student/student.service';

@Component({
  selector: 'app-view-preceding-tickets',
  templateUrl: './view-preceding-tickets.component.html',
  styleUrls: ['./view-preceding-tickets.component.scss']
})
export class ViewPrecedingTicketsComponent implements OnInit {

  private precedingTickets: any;
  private activeStudent: any;

  constructor(private ticketService: TicketService,
    private userService: UserService,
    private studentService: StudentService) { }

  ngOnInit() {

    this.userService.getActiveUser().subscribe(
      (user: any) => {
        if (user.type == 'S') {
          this.activeStudent = this.studentService.getStudentByUserId(user._id);

          this.ticketService.viewPrecedingTickets(this.activeStudent).subscribe(
            (data: any) => {
              this.precedingTickets = data;
            },
            err => { console.error(err); }
          );
        }
      },
      err => { console.error(err); }
    );

  }

}
