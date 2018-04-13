import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { UserService } from '../../../user/user.service';
import { StudentService } from '../../../student/student.service';
import { ServiceService } from '../../../service/service.service';
import { tick } from '@angular/core/testing';
import { Services } from '@angular/core/src/view';

@Component({
  selector: 'app-view-student-ticket',
  templateUrl: './view-student-ticket.component.html',
  styleUrls: ['./view-student-ticket.component.scss']
})
export class ViewStudentTicketComponent implements OnInit {

  private activeTicket: any;

  constructor(private ticketService: TicketService,
    private userService: UserService,
    private studentService: StudentService,
    private sService: ServiceService) { }

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

                      this.activeTicket[0].ticketCount = precedingTickets.length;

                      var minutes = 0;

                      for (var i = 0; i < precedingTickets.length; i++) {

                        if (precedingTickets[0].serviceId !== null) {

                          this.sService.getServiceById({ id: precedingTickets[i].serviceId }).subscribe(
                            (service: any) => {
                              minutes += parseInt("" + service.averageMinutes);

                              this.activeTicket[0].hours = parseInt("" + (minutes / 60));
                              this.activeTicket[0].minutes = minutes % 60;
                            },
                            err => { console.error(err); });
                        }
                        else {
                          console.log("no service id");
                        }
                      }
                    },
                    err => { console.error(err); }
                  );
                },
                err => { console.error(err); }
              );
            });
        }
      },
      err => { console.error(err); }
    );
  }

}
