import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { ActivatedRoute, RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  ret: any;

//  constructor(private UserService: UserService, private router: RouterModule) { }
  constructor(private route:ActivatedRoute,private router: Router, private UserService: UserService) { }
  ngOnInit() {
  }

  logIn() {
    this.UserService.login({username:this.username, password:this.password})
    .subscribe(
      (data:any) => {
        this.ret = data;
        console.log("retorno", this.ret);
        console.log("login", this.ret.login);
        if(this.ret.login == true) {
          this.router.navigate(['home']);
        }
      },
      err => {console.error(err);}
    );   
  }
}
