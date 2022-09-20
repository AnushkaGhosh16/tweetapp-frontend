import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './content/login/login.component';
import { RegisterComponent } from './content/register/register.component';
import { HomeComponent } from './content/home/home.component';
import { UsersComponent } from './content/users/users.component';
import { ForgotPasswordComponent } from './content/forgot-password/forgot-password.component';
import { RouteGuardService } from './shared-service/routeguard.service';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './content/profile/profile.component';
import { UserProfileComponent } from './content/user-profile/user-profile.component';
import { AllTweetsComponent } from './content/all-tweets/all-tweets.component';
import { UpdateTweetComponent } from './content/update-tweet/update-tweet.component';
import { ReplyComponent } from './content/reply/reply.component';
const routes: Routes = [
  {'path':'',redirectTo:'/login',pathMatch:'full'},
  {'path':'login',component:LoginComponent},
  {'path':'forgot',component:ForgotPasswordComponent},
  {'path':'register',component:RegisterComponent},
  {'path':'home/:this.user.userName',component:HomeComponent, canActivate:[RouteGuardService]},
  {'path':'users/all/:this.userName',component:UsersComponent},
  {'path':'profile/:this.userName',component:ProfileComponent},
  {'path':'user-profile/:this.userName',component:UserProfileComponent},
  {'path':'logout',component:LogoutComponent}, 
  {'path':'all',component:AllTweetsComponent},
  {'path':':this.username/update/:this.id',component:UpdateTweetComponent},
  {'path':':this.username/reply/:this.name/:this.id',component:ReplyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 