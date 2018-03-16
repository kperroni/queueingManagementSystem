import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../user/user.service';
import { AppSessionService } from '../../../shared/session/session.service';
import { ToasterService, ToasterModule } from 'angular5-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private UserService: UserService, private session: AppSessionService, private router: Router, private toast: ToasterService) { }

  ngOnInit() {
  }

  logIn() {
    this.UserService.logIn({ username: this.username, password: this.password })
      .subscribe(
        (data: any) => {
          let loginResult = data;
          switch (loginResult[0].message) {
            case '0': {
              this.router.navigate(['/login']);
              break;
            }
            case '1': {
              this.session.setSessionToken(loginResult[1]);
             // this.router.navigate(['/home']);
              this.toast.pop('success', 'Qme', 'Welcome! ' +loginResult[1].firstName);
              break;
            }
          }
        },
        err => { console.error(err); }
      );
  }
}
