import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../../modules/user/user.service';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../../../services/messages/message.service';
import { ToasterService } from 'angular5-toaster/angular5-toaster';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  user: Observable<any>;

  @Input() ticketNumber: any;

  showAlert: boolean;

  constructor(private userService: UserService, private router: Router, private toaster: ToasterService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.user = this.userService.getUserSession();
      }
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

  ngOnInit() {
    this.onAlertHide();
  }

  onLogOut() {
    this.userService.logOut().subscribe(
      (data: any) => {
        if (data.message === '1') {
          this.toaster.pop('success', 'Qme', 'You have successfully logged out');
          this.user = this.userService.getUserSession();
          this.router.navigateByUrl('/home');
        } else {
          console.log('Something went wrong when logging out');
        }
      }
    );
  }

  onAlertShow() {
    this.showAlert = true;
  }

  onAlertHide() {
    this.showAlert = false;
  }

  showGuestTicket() {
    console.log("header comp : " + this.ticketNumber);
    this.router.navigateByUrl('guestActiveTicket/' + this.ticketNumber);
  }
}