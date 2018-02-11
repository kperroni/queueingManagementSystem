import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Array<any>; // Eventually it should be an array of User (Class)

  constructor(private UserService: UserService) { 
    
  }

  ngOnInit() {
    this.UserService.getUsers()
    .subscribe(res => this.users = res);
  }

}
