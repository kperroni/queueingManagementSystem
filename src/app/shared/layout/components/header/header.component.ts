import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../modules/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: Observable<any>;
  constructor(private UserService: UserService, private router: Router) { }

  ngOnInit() {
      this.user =this.UserService.getUserSession();
  }

  onLogOut(){
    this.UserService.logOut().subscribe( 
      (data:any) => {
        if(data.message = 1){
          this.router.navigate(['/home']);
        }       
        else{
          console.log("Something went wrong when logging out");
        }  
      }
    );
  }
}
