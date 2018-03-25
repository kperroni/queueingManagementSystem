import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../../../modules/user/user.service';
import { Router, Event, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: Observable<any>;
  constructor(private UserService: UserService, private router: Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.user =this.UserService.getUserSession();
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
   }

  ngOnInit() {
    
  }

  onLogOut(){
    this.UserService.logOut().subscribe( 
      (data:any) => {
        if(data.message == 1){
          window.location.href = "/home";
        }       
        else{
          console.log("Something went wrong when logging out");
        }  
      }
    );
  }

  ngAfterViewInit() {
    
  }
}
