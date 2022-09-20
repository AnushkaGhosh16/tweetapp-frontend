import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { AuthenticationService } from 'src/app/shared-service/authentication.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: any[]=[];

  loginId = ''

  userName = ''
  searchMessage = ''
  val = false
  noUser = ''
  name : any
  users:any
  constructor(private sharedService:SharedServiceService,private route:ActivatedRoute, private router: Router,private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    
    this.name=localStorage.getItem('authenticatedUser');
    this.users=this.route.snapshot.params['this.userName']
    if(this.name!==this.users){
      alert("You are not authorised")
      this.router.navigate(['login']);
    }
    this.sharedService.getUsers().subscribe(response => {
      this.user = response
      console.log(response);
    })
  }

  search() {
    this.noUser = ''

    if (this.userName === '') {
      this.searchMessage = "Please type something before searching"
    }
    else {
      this.searchMessage = ''
      this.sharedService.searchUser(this.userName).subscribe({next: data => {
        
        this.user = data.user;
        console.log(this.user);
       

      },error: e=>{
        if (!this.user.length) {
          this.noUser = "No Results for '" + this.userName+"'"
          this.sharedService.getUsers().subscribe(response => {
            this.user = response
          })
        }
        console.log(e);
        this.searchMessage=e.error.status;
        
        }
      });
    }

  }
  goToProfile(userName:any){
    if(this.authenticationService.isUserLoggedIn()){
      if(userName==this.name){
          this.router.navigate(['profile',userName]);
      }else{
        this.router.navigate(['user-profile',userName]);
    }
  }
}
  goToHome(){
    if(this.authenticationService.isUserLoggedIn()){
        this.router.navigate(['home',this.authenticationService.getUser()]);
    }
  }

}
