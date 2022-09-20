import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from 'src/app/shared-service.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
user:any={
  userName : "",
  password : ""
}

error:string = "";

  constructor(private sharedService:SharedServiceService) { }

  ngOnInit(): void {
  }
forgot(){
  if(this.user.userName.length==0 || this.user.password.length==0){
    this.error='Please fill up all the fields'
    return;
    }
    else{
      this.sharedService.forgotPassword(this.user.userName,this.user.password).subscribe(data =>{
        this.error="Password reset successful";
        this.user=data;
        console.log(this.user);
      })
    }

}
}
