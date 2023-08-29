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
    console.log(token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${token}`
    });
    return this.http.post('http://localhost:3000/api/v1/signout',{},{headers});
  }
}
