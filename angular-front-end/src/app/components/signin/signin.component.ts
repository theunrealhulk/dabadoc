import { Component,OnInit  } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private apiService: ApiServiceService) { }
  submittedBy: string | null = null;
  email: string = '';
  password: string = '';
  ngOnInit(){
    if(localStorage.getItem('api_key'))
    {
      location.href = 'http://localhost:4200/questions'
    }
  }
  onFormSubmit() {
    // Perform your form submission logic here
    if (this.submittedBy == "signIn"){
      //signIn request
      this.apiService.signIn(this.email, this.password).subscribe((res:any) => {
        if( res.ok){
          console.log('Response:', res.token);
          localStorage.setItem('api_key',res.token);
          location.href="http://localhost:4200/questions"
        }

      },e=>{
        alert(e.error.msg);
        console.log('Error:', e.error.msg);

      });

    }

    if (this.submittedBy == "signUp"){
      //signUp request
      this.apiService.signUp(this.email, this.password).subscribe(res => {

        console.log('Response:', res);
        // localStorage.setItem('api_key',res.token);
        alert('successfully signed up click on \'signIn\' to use the app')
      },e=>{
        let msg="Invalid Form Fields\n\n"
        if(e.error.error)
        {
          for(const field in e.error.error){
            if(e.error.error.hasOwnProperty(field))
            {
              msg+=`${field}\n`
              for (const err of e.error.error[field]) {
                msg+=`${err}\n`
              }
            }
          }
        }
        else msg=e.error.msg
        alert(msg);
        console.log('Error:', e.error);

      });
    }
  }

  setSubmitButton(button: string) {
    this.submittedBy = button;
    console.log(this.submittedBy);
  }
}
