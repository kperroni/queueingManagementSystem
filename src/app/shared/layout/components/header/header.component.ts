import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../modules/user/user.service';
import { AppSessionService } from '../../../session/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private UserService: UserService, private session: AppSessionService, private router: Router) { }

  ngOnInit() {
  }

  logOut(){
    this.UserService.logOut().subscribe( 
      (data:any) => {
        if(data.message = 1){
          this.session.destroySessionToken();
          this.router.navigate(['/home']);
        }       
        else{
          console.log("Something went wrong when logging out");
        }  
      }
    );
  }
}
