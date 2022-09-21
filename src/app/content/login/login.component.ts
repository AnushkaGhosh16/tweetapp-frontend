import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared-service/authentication.service';
import { SharedServiceService } from 'src/app/shared-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:any ={
    userName : "",
    password : ""
  }

  error:string = "";
  errorMessage = 'Invalid Credentials'
  invalidLogin = false
  error1:string=""
  constructor(private router: Router, private autheneticationService: AuthenticationService,private sharedService:SharedServiceService) { }
 
  ngOnInit(): void {
   
  }

  login(){
    if(this.user.userName.length==0 || this.user.password.length==0){
    this.error1='Please fill up all the fields'
    return;
    }
    else{
      this.sharedService.login(this.user).subscribe(data=>{
        if (data.message === 'Login Successful') {
          localStorage.setItem('authenticatedUser', this.user.userName)
          
          this.router.navigate(['home',this.user.userName])
          this.invalidLogin = false
        }else{
          this.invalidLogin = true
          this.error1=data.message;
          }
       },error=>{this.error1=error.error.message});
      }
    }

reset(){
  this.user={
    userName:"",
    password:""
  }
}
}
