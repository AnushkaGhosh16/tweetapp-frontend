import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { AuthenticationService } from 'src/app/shared-service/authentication.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any[]=[];

  tweet:any[]=[];

  userName = ''
  likes:String=''
  noUser = ''
  tweetsToShow=false
  error=''
  name:any
  constructor(private sharedService:SharedServiceService,private route:ActivatedRoute, private router:Router, private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.noUser = ''
    this.name=localStorage.getItem('authenticatedUser');
    this.userName=this.route.snapshot.params['this.userName']
      this.sharedService.searchUser(this.userName).subscribe(data => {
        
        this.user = data.user;
        console.log(this.user);
      })

      this.sharedService.viewTweets(this.userName).subscribe({next: response =>{
        this.tweet=response
      },error: e=>{
        this.tweetsToShow=true
        console.log(e);
        this.error=e.error;
      }
     });
  }
  
  goToAllUsers(){
    if(this.authenticationService.isUserLoggedIn()){
        this.router.navigate(['users/all',this.authenticationService.getUser()]);
    }
  }
  goToReply(username:any,id:any){
    if(this.authenticationService.isUserLoggedIn()){
      username=this.name;
      this.router.navigate([username,'reply',this.userName,id]);
    }
  }
  like(userName:any, id:any){
    userName=this.name;
    this.sharedService.addLike(userName,id).subscribe({next: data=>{
      this.likes=data
      
       },error: e=>{
        this.ngOnInit();
        console.log(e);
        this.error=e.error;
      }
    });
  }
  goToHome(){
    if(this.authenticationService.isUserLoggedIn()){
        this.router.navigate(['home',this.authenticationService.getUser()]);
    }
  }

}
