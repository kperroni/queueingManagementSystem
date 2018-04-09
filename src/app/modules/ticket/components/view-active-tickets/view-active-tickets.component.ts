import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../ticket.service';
import { Router, NavigationStart } from '@angular/router';
import { UserService } from '../../../user/user.service';
import { ServiceProviderService } from '../../../service-provider/service-provider.service';
import { StudentService } from '../../../student/student.service';

@Component({
  selector: 'app-view-active-tickets',
  templateUrl: './view-active-tickets.component.html',
  styleUrls: ['./view-active-tickets.component.scss']
})
export class ViewActiveTicketsComponent implements OnInit {

  private activeTickets: any;

  constructor(private ticketService: TicketService,
    private userService: UserService,
    private serviceProviderService: ServiceProviderService,
    private router: Router,
    private studentService: StudentService) { }

  ngOnInit() {

    this.userService.getActiveUser().subscribe(
      (user: any) => {
        if (user !== null && user.type == 'E') {
          console.log("finding sp");
          this.serviceProviderService.getProviderByUserId({ userId: user._id }).subscribe(
            (employee: any) => {

              console.log("got one");

              this.ticketService.getActiveTickets().subscribe(
                (activeTickets: any) => {

                  this.activeTickets = activeTickets;
                  this.activeTickets.forEach(ticket => {
                    this.studentService.getStudentByUserId({ userId: ticket.studentId }).subscribe(
                      (student2: any) => {
                        ticket.studentNumber = student2.studentNumber
                      }, err => { console.error(err); });
                  });
                },
                err => { console.error(err); }
              );
            },
            err => { console.error(err); }
          );
        }
        else {
          this.router.navigateByUrl('/home');
        }
      },
      err => { console.error(err); }
    );
  }
}
