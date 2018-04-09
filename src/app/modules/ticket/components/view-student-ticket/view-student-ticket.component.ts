import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { UserService } from '../../../user/user.service';
import { StudentService } from '../../../student/student.service';

@Component({
  selector: 'app-view-student-ticket',
  templateUrl: './view-student-ticket.component.html',
  styleUrls: ['./view-student-ticket.component.scss']
})
export class ViewStudentTicketComponent implements OnInit {

  private activeTickets: any;
  private activeStudent: any;

  private studentNumber: number;

  constructor(private ticketService: TicketService,
    private userService: UserService,
    private studentService: StudentService) { }

  ngOnInit() {

    this.userService.getActiveUser().subscribe(
      (user: any) => {
        console.log(user);
        if (user.type == 'S') {
          this.studentService.getStudentByUserId({ userId: user._id }).subscribe(
            (student: any) => {


              this.activeStudent = student;
              this.ticketService.getStudentTicket({ body: student }).subscribe(
                (data: any) => {
                  this.activeTickets = data;
                  this.activeTickets.forEach(ticket => {
                    ticket.studentNumber = student.studentNumber;
                  });
                },
                err => { console.error(err); }
              );
            },
            err => { console.error(err); }
          );
        }
      },
      err => { console.error(err); }
    );
  }

}
