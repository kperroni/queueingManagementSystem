import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: any[]; // Eventually it should be an array of User (Class)
  error: any;

  constructor(private UserService: UserService) { 
    
  }

  ngOnInit() {
    this.UserService.getUsers()
    .subscribe(
      (data:any[]) => this.users = data,
      err => {console.error(err)}
    );
  }

}
