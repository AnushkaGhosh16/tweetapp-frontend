import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './content/login/login.component';
import { RegisterComponent } from './content/register/register.component';
import { HomeComponent } from './content/home/home.component';
import { UsersComponent } from './content/users/users.component';
import { ForgotPasswordComponent } from './content/forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './content/profile/profile.component';
import { UserProfileComponent } from './content/user-profile/user-profile.component';
import { AllTweetsComponent } from './content/all-tweets/all-tweets.component';
import { UpdateTweetComponent } from './content/update-tweet/update-tweet.component';
import { ReplyComponent } from './content/reply/reply.component';
@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UsersComponent, 
    ForgotPasswordComponent, LogoutComponent, ProfileComponent, UserProfileComponent, AllTweetsComponent, UpdateTweetComponent, ReplyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
