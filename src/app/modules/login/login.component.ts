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

  submit() {
    console.log("submit1");
    this.UserService.login({username:this.username, password:this.password})
    .subscribe(
      (data:any) => {
        this.ret = data;
        console.log("ret", this.ret);
      },
      err => {console.error(err);}
    );
    console.log("submit2");
  }
}
