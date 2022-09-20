import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor(private http:HttpClient) { }

  baseUrl : String = environment.baseUrl;

  registerUser(user:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+'/api/v1.0/tweets/register',user);
  }

  login(loginUser:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+'/api/v1.0/tweets/login',loginUser);
  }

  getUsers():Observable<any>{
    return this.http.get<any>(this.baseUrl+'/api/v1.0/tweets/users/all');
  }

  searchUser(userName:any):Observable<any>{
    return this.http.get<any>(this.baseUrl+'/api/v1.0/tweets/user/search/'+userName);
  }  

  forgotPassword(userName:any,password:any):Observable<any>{
    return this.http.put<any>(this.baseUrl+'/api/v1.0/tweets/'+userName+'/forgot',password);
  }

  addTweet(userName:any,tweet:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+'/api/v1.0/tweets/'+userName+'/add',tweet,{
      observe:'body',responseType:'text' as 'json'
    });
  }

  getTweets():Observable<any>{
    return this.http.get<any>(this.baseUrl+'/api/v1.0/tweets/all');
  }

  viewTweets(userName:any):Observable<any>{
    return this.http.get<any>(this.baseUrl+'/api/v1.0/tweets/'+userName);
  }

  deleteTweet(userName:any,id:any):Observable<any>{
    return this.http.delete(this.baseUrl+'/api/v1.0/tweets/'+userName+'/delete/'+id,{
      observe:'body',responseType:'text' as 'json'
    });
  }

  updateTweet(userName:any,id:any,tweet:any):Observable<any>{
    return this.http.put<any>(this.baseUrl+'/api/v1.0/tweets/'+userName+'/update/'+id,tweet);
  }

  addLike(userName:any,id:any):Observable<any>{
    return this.http.put<any>(this.baseUrl+'/api/v1.0/tweets/'+userName+'/like/'+id,{
      observe:'body',responseType:'text' as 'json'
    });
  }

  addReply(username:any,id:any,reply:any):Observable<any>{
    return this.http.post<any>(this.baseUrl+'/api/v1.0/tweets/'+username+'/reply/'+id,reply,{
      observe:'body',responseType:'text' as 'json'
    });
  }
} 
