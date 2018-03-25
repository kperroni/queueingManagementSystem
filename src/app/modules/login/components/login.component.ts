import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../user/user.service';
import { MessageService } from '../../../shared/services/messages/message.service';
import { ToasterService } from 'angular5-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private ngZone: NgZone, private UserService: UserService, private router: Router, private message: MessageService, private toaster: ToasterService) { }

  ngOnInit() {
  }

  onLogIn() {
    this.UserService.logIn({ username: this.username, password: this.password })
      .subscribe(
        (data: any) => {
          let loginResult = data;
          switch (loginResult[0].message) {
            case '0': {
              this.toaster.pop('error', 'Qme', 'Invalid credentials. Please try again');
              break;
            }
            case '1': {
              this.ngZone.run(() => this.router.navigate(['/home']))         
              this.message.setMessage('success', 'Qme', 'Welcome! ' +loginResult[1].firstName);
              //window.location.href = "home";
              break;
            }
          }
        },
        err => { console.error(err); }
      );
  }
}
