import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  ret: any;

  constructor(private UserService: UserService) { }

  ngOnInit() {
  }

  logIn() {
    this.UserService.login({username:this.username, password:this.password})
    .subscribe(
      (data:any) => {
        this.ret = data;
        console.log("retorno", this.ret);
      },
      err => {console.error(err);}
    );   
  }
}
