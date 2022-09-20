import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { AuthenticationService } from 'src/app/shared-service/authentication.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any[]=[];
  tweet:any[]=[];
  tweets:any={
    tweet:"",
    userName:"",
    postedAt:"",
    replies:"",
    tweetTag:"",
    likes:"",
    likedBy:""
  }
  likes:String=''
  loginId = ''
  loggedUser:any
  name = ''
  searchMessage = ''
  val = false
  noUser = ''
  error=''
  tweetInValid = false
  messageForTweet = ''
  tweetsToShow = false
  logged=''
  constructor(private sharedService:SharedServiceService,private router:Router, private route:ActivatedRoute,private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    
      this.noUser = ''
      this.loggedUser=localStorage.getItem('authenticatedUser');
      this.name=this.route.snapshot.params['this.userName']
      
    if(this.loggedUser!==this.name){
      alert("You are not authorised")
      this.router.navigate(['login']);
    }
        this.sharedService.searchUser(this.name).subscribe(data => {
          
          this.user = data.user;
          console.log(this.user);
         
  
        })
        this.sharedService.viewTweets(this.name).subscribe({next: response =>{
          this.tweet=response
          console.log(this.tweet.length)
        },error: e=>{
          console.log(e);
          this.error=e.error;
        }
       });
      
  }

  postTweet() {
    if (this.tweets.tweet === '') {
      this.tweetInValid = true
      this.messageForTweet = "Please type something before posting the tweet."
    }
    else {
      this.tweetInValid = false
      this.sharedService.addTweet(this.name,this.tweets).subscribe({next:response => {
        response=this.tweets
        this.searchMessage='Tweet added';
        this.router.navigate(['profile', this.name]).then(() => {
          this.ngOnInit();
          this.reset();
        });
        
      },error: e=>{
        console.log(e);
        this.error=e.error;
        }
      });
    }
    
  }

  deleteTweet(username:any, id: any) {

    this.sharedService.deleteTweet(username,id).subscribe({next: data=>{
   
      this.router.navigate(['profile',username]).then(() => {
      
        this.ngOnInit();
      });
    },error:e=>{
        this.ngOnInit();
        this.error=e.error;
     }
        
    });
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
  like(userName:any, id:any){
    this.sharedService.addLike(userName,id).subscribe({next: data=>{
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
      username=this.name;
      this.router.navigate([username,'reply',username,id]);
    }
  }
 goToUpdate(username:any,id:any){
  if(this.authenticationService.isUserLoggedIn()){
    this.router.navigate([username,'update',id]);
  }
 }
  goToHome(){
    if(this.authenticationService.isUserLoggedIn()){
        this.router.navigate(['home',this.authenticationService.getUser()]);
    }
  }
}


