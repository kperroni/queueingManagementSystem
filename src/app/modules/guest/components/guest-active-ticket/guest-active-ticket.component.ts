import { Component, OnInit, OnChanges } from '@angular/core';
import { TicketService } from '../../../ticket/ticket.service';
import { UserService } from '../../../user/user.service';
import { StudentService } from '../../../student/student.service';
import { Router, NavigationStart, Params, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ServiceService } from '../../../service/service.service';
import { tick } from '@angular/core/testing';
import { Services } from '@angular/core/src/view';

@Component({
  selector: 'app-guest-active-ticket',
  templateUrl: './guest-active-ticket.component.html',
  styleUrls: ['./guest-active-ticket.component.scss']
})
export class GuestActiveTicketComponent implements OnInit, OnChanges {

  private activeTicket: any;
  public ticketNumber: any;

  constructor(private ticketService: TicketService,
    private userService: UserService,
    private studentService: StudentService,
    private sService: ServiceService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {

    this.activeTicket = null;
    this.ticketNumber = parseInt(this.activatedRouter.snapshot.params['ticketNumber']);
    console.log("guest comp cons : " + this.ticketNumber);
  }

  ngOnInit() {

    this.showGuestTicket();
  }

  ngOnChanges() {

    this.showGuestTicket();
  }

  showGuestTicket() {
    this.activeTicket = null;
    this.ticketNumber = parseInt(this.activatedRouter.snapshot.params['ticketNumber']);
    //this.ticketNumber = ;
    console.log("at guest comp : " + this.ticketNumber);

    this.ticketService.getTicketByTicketNumber({ ticketNumber: this.ticketNumber }).subscribe(
      (studentTicket: any) => {

        this.activeTicket = studentTicket;

        console.log(this.activeTicket);

        this.sService.getServiceById({ _id: studentTicket.serviceId }).subscribe(
          (service: any) => {

            console.log(studentTicket.serviceId);

            this.ticketService.getActiveTicketsInQueue({ queueId: service.queueId }).subscribe(
              (precedingTickets: any) => {

                this.activeTicket.ticketCount = 0;

                var minutes = 0;

                for (var i = 0; i < precedingTickets.length; i++) {

                  if ((precedingTickets[i]._id != studentTicket._id)
                    && (precedingTickets[i].weight > studentTicket.weight
                      || (precedingTickets[i].weight == precedingTickets[i].weight
                        && precedingTickets[i].creationTime < studentTicket.creationTime
                      ))) {

                    ++this.activeTicket.ticketCount;

                    minutes += parseInt("" + precedingTickets[i].services.averageMinutes);
                  }

                  this.activeTicket.hours = parseInt("" + (minutes / 60));
                  this.activeTicket.minutes = minutes % 60;
                }
              },
              err => { console.error(err); }
            );
          },
          err => { console.error(err); }
        );
      },
      err => { console.error(err); }
    );
  }

}