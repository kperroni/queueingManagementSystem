import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../modules/user/user.service';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MessageService } from '../../../services/messages/message.service';
import { ToasterService } from 'angular5-toaster/angular5-toaster';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: Observable<any>;
//  type: any;
  constructor(private UserService: UserService, private router: Router, private toaster: ToasterService) {
    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.user = this.UserService.getUserSession();
/*        if(this.user) {
          this.UserService.getActiveUser().subscribe(
            (data:any) => {
              this.type = data.type;
            },
            (err) => {console.error(err)}
          );
        }
*/
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
          this.toaster.pop('success', 'Qme', 'You have successfully logged out');
          this.user = this.UserService.getUserSession();

          this.router.navigateByUrl('/home');
        }       
        else{
          console.log("Something went wrong when logging out");
        }  
      }
    );
  }
}
