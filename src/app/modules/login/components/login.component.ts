import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../user/user.service';
import { AppSessionService } from '../../../shared/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private UserService: UserService, private session: AppSessionService, private router: Router) { }

  ngOnInit() {
  }

  logIn() {
    this.UserService.login({ username: this.username, password: this.password })
      .subscribe(
        (data: any) => {
          console.log(data);
          let loginResult = data;
          switch (loginResult[0].message) {
            case '0': {
              this.router.navigate(['/login']);
              break;
            }
            case '1': {
              this.session.setSessionToken(loginResult[1]);
              this.router.navigate(['/home']);
              break;
            }
          }
        },
        err => { console.error(err); }
      );
  }
}
