import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { AuthenticationService } from 'src/app/shared-service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:any
  tweet:any[]=[]
  tweets:any={
    tweet:"",
    userName:"",
    postedAt:"",
    replies:"",
    tweetTag:"",
    likes:"",
    likedBy:""
  }
  likes:String=""
  loginId = ''
  name=''
  userName = ''
  searchMessage = ''
  val = false
  noUser = ''
  tweetInValid = false
  messageForTweet = ''
  error=''
  logged=''
  constructor(private service:SharedServiceService,private route:ActivatedRoute,private router:Router, private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.user=localStorage.getItem('authenticatedUser');
    this.logged=this.route.snapshot.params['this.user.userName'];
    if(this.user!==this.logged){
      alert("You are not authorised")
      this.router.navigate(['login']);
    }
    console.log(this.user);
    console.log(this.logged);
    this.service.getTweets().subscribe(data=>{
      this.tweet=data
    })
  }

  postTweet() {
    if (this.tweets.tweet === '') {
      this.tweetInValid = true
      this.messageForTweet = "Please type something before posting the tweet."
    }
    else {
      this.tweetInValid = false
      this.service.addTweet(this.user,this.tweets).subscribe({next:response => {
        response=this.tweets
        this.reset();
        this.ngOnInit();
      },error: e=>{
        console.log(e);
        this.searchMessage="please type before searching"
        this.error=e.error;
        }
      });
    }
    
  }

  reset(){
    this.tweets={
      tweet:"",
      userName:"",
      postedAt:"",
      replies:"",
      tweetTag:"",
      likes:"",
      likedBy:""
    }
  }
    
  view() {
    this.noUser = ''

    if (this.userName === '') {
      this.searchMessage = "Please type something before searching"
    }
    else {
      this.searchMessage = ''
      this.service.viewTweets(this.userName).subscribe({next: data => {
        
        this.tweet = data;
        console.log(this.tweet);
       

      },error: e=>{
        if (!this.tweet.length) {
          this.noUser = "No Results for '" + this.userName+"'"
          this.service.getUsers().subscribe(response => {
            this.tweet = response
          })
        }
        console.log(e);
        this.searchMessage=e.error.status;
        
        }
      });
    }

  }

  like(userName:any, id:any){
    userName=this.user;
    this.service.addLike(userName,id).subscribe({next: data=>{
      this.likes=data
      
       },error: e=>{
        this.ngOnInit();
        console.log(e);
        this.error=e.error;
      }
    });
  }

  goToReply(username:any,id:any){
    if(this.authenticationService.isUserLoggedIn()){
      this.name=this.user;
      this.router.navigate([this.name,'reply',username,id]);
    }
  }
  
}
