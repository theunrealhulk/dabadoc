import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }
  signIn(email: string, password: string) {
    const data = { email, password };
    return this.http.post('http://localhost:3000/api/v1/signin', data);
  }
  signUp(email: string, password: string) {
    const data = { email, password };
    return this.http.post('http://localhost:3000/api/v1/signup', data);
  }
  signOut() {
    let token = localStorage.getItem('api_key');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}`
    });
    return this.http.post('http://localhost:3000/api/v1/signout',{},{headers});
  }
  postQuestion(title: string,content: string,location:string){
    let token = localStorage.getItem('api_key');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}`
    });
    return this.http.post('http://localhost:3000/api/v1/post_question',{title,content,location},{headers});
  }
  getUser(){
    let token = localStorage.getItem('api_key');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}`
    });
    return this.http.get('http://localhost:3000/api/v1/get_user',{headers});
  }
  getQuestions(){
    let token = localStorage.getItem('api_key');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}`
    });

    return this.http.get('http://localhost:3000/api/v1/questions',{headers});
  }
  likeToggle(questionId:string){
    let token=localStorage.getItem("api_key");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}`
    });
    return this.http.post('http://localhost:3000/api/v1/toggle_favorites',{questionId},{headers});
  }
}
