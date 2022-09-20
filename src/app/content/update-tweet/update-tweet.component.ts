import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { AuthenticationService } from 'src/app/shared-service/authentication.service';

@Component({
  selector: 'app-update-tweet',
  templateUrl: './update-tweet.component.html',
  styleUrls: ['./update-tweet.component.css']
})
export class UpdateTweetComponent implements OnInit {
  user:any[]=[]
  tweets:any={
    tweet:"",
    userName:"",
    postedAt:"",
    replies:"",
    tweetTag:"",
    likes:"",
    likedBy:""
  }
  newTweet:any={
    tweet:"",
    userName:"",
    postedAt:"",
    tweetTag:""
  }
  
  name:any
  id:any
  tweetInValid=false
  messageForTweet=''
  tweetsToShow=false
  error=''

  constructor(private service:SharedServiceService,private route:ActivatedRoute, private router:Router, private auth:AuthenticationService) { }
 
  ngOnInit(): void {
    this.name=localStorage.getItem('authenticatedUser');
    this.id=this.route.snapshot.params['this.id'];
  }
update(){
  if (this.newTweet.tweet === '') {
    this.tweetInValid = true
    this.messageForTweet = "Please type something before posting the tweet."
  }
  else{
    this.tweetInValid = false
  
    console.log(this.newTweet)
    this.service.updateTweet(this.name,this.id,this.newTweet).subscribe({next : data=>{
      this.tweets=data;
      
      
      this.router.navigate(['profile',this.name])
     
    },error: e=>{
      console.log(e);
      this.error=e.error;
    }
    });
  }
}
}

