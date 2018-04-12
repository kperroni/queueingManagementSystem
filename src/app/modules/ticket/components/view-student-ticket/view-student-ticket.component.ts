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

  private activeTicket: any;

  private ticketCount: number;

  private studentNumber: number;

  constructor(private ticketService: TicketService,
    private userService: UserService,
    private studentService: StudentService) { }

  ngOnInit() {

    this.userService.getActiveUser().subscribe(
      (user: any) => {

        if (user.type == 'S') {
          this.studentService.getStudentByUserId({ id: user._id }).subscribe(
            (student: any) => {

              this.ticketService.getStudentTicket({ body: student }).subscribe(
                (studentTicket: any) => {

                  studentTicket.studentNumber = student.studentNumber;
                  this.activeTicket = [];

                  this.activeTicket.push(studentTicket);

                  this.ticketService.viewPrecedingTickets({ activeStudent: student }).subscribe(
                    (precedingTickets: any) => {

                      console.log(precedingTickets);
                      this.activeTicket[0].ticketCount = precedingTickets.length;
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
