import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { AuthenticationService } from 'src/app/shared-service/authentication.service';
@Component({
  selector: 'app-all-tweets',
  templateUrl: './all-tweets.component.html',
  styleUrls: ['./all-tweets.component.css']
})
export class AllTweetsComponent implements OnInit {

  tweets:any[]=[]
  loginId = ''

  userName = ''
  searchMessage = ''
  val = false
  noUser = ''

  constructor(private sharedService:SharedServiceService, private router: Router,private authenticationService:AuthenticationService) { }

  ngOnInit(): void {

    this.sharedService.getTweets().subscribe(data=>{
      this.tweets=data
    })
  }

  view() {
    this.noUser = ''

    if (this.userName === '') {
      this.searchMessage = "Please type something before searching"
    }
    else {
      this.searchMessage = ''
      this.sharedService.viewTweets(this.userName).subscribe({next: data => {
        
        this.tweets = data;
        console.log(this.tweets);
       

      },error: e=>{
        if (!this.tweets.length) {
          this.noUser = "No Results for '" + this.userName+"'"
          this.sharedService.getUsers().subscribe(response => {
            this.tweets = response
          })
        }
        console.log(e);
        this.searchMessage=e.error.status;
        
        }
      });
    }

  }

  goToHome(){
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['home',this.authenticationService.getUser()]);
  }
}

}
