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
  private activeStudent: any;

  private ticketCount: number;

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

                  data.studentNumber = student.studentNumber;
                  this.activeTicket = [];

                  console.log(data);

                  this.activeTicket.push(data);

                  this.ticketService.viewPrecedingTickets({ body: student }).subscribe(
                    (data: any) => {

                      this.ticketCount = data.length;
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
