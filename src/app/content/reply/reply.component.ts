import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from 'src/app/shared-service.service';
import { AuthenticationService } from 'src/app/shared-service/authentication.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

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
    tweetTag:""
  }
  
  name:any
  id:any
  username:any
  tweetInValid=false
  messageForTweet=''
  tweetsToShow=false
  error=''
  replyName=''
  constructor(private service:SharedServiceService,private route:ActivatedRoute,private router:Router,private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.name=localStorage.getItem('authenticatedUser');
    this.id=this.route.snapshot.params['this.id'];
    this.replyName=this.route.snapshot.params['this.name'];
  }

  reply(){
    if (this.newTweet.tweet === '') {
      this.tweetInValid = true
      this.messageForTweet = "Please type something before posting the reply."
    }
    else{
      this.tweetInValid = false
      this.username=this.name;
      this.service.addReply(this.username,this.id,this.newTweet).subscribe({next: data=>{
        this.tweets=data;
        this.router.navigate(['home',this.username])
      },error:e=>{
        console.log(e);
        this.error=e.error;
      }
    });
    }
  }

}
