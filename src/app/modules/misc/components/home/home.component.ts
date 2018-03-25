import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { ToasterService } from 'angular5-toaster';
import { MessageService } from '../../../../shared/services/messages/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: any[];
  error: any;
  constructor(private UserService: UserService, private toaster: ToasterService, private message: MessageService, private router: Router) { }

  ngOnInit() {
    
    
    /*if(this.message.getMessage().clear === "0"){   
      let toastMessage = this.message.getMessage();
      this.toaster.pop(toastMessage.type, toastMessage.title, toastMessage.body);
      this.message.clearMessage();
    }*/

    

    this.UserService.getUsers()
    .subscribe(
      (data:any[]) => this.users = data,
      err => {console.error(err)}
    );
  }

  ngAfterViewInit() {
    if(this.message.getMessage().clear === "0"){   
      let toastMessage = this.message.getMessage();
      this.toaster.pop(toastMessage.type, toastMessage.title, toastMessage.body);
      this.message.clearMessage();
    }
  }
}
