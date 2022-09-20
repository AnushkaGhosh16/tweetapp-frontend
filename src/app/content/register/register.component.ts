import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from 'src/app/shared-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:any = {
    loginId : "",
    firstName : "",
    lastName : "",
    userName : "",
    email : "",
    password : "",
    confirmPassword : "",
    number : ""
  }

  
  success: boolean = false;
  error:string = "";

  constructor(private sharedService:SharedServiceService) { }

  ngOnInit(): void {
  }

  register(){
  
    if(this.user.firstName.length==0 || this.user.lastName.length==0 || this.user.userName.length==0
      || this.user.email.length==0 || this.user.password.length==0 || this.user.confirmPassword.length==0
      || this.user.number.length==0){
        
        this.error='Please fill up all the fields'
        return;
      }
      else{
        if(this.user.password!=this.user.confirmPassword){
          this.error="Passwords do not match";
        }else{
          this.sharedService.registerUser(this.user).subscribe({next: data=>{
    
              this.error="";
              this.success = true;
              console.log(this.user);
              this.reset();
            
         },error: e=>{
           console.log(e);
           this.error=e.error.message;
         }
        });
        }
      }
  }

  reset(){
    this.user = {
      firstname : "",
      lastname : "",
      username : "",
      email : "",
      password : "",
      confirmPassword : "",
      number : ""
      }
  }
}
