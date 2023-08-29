import { Component ,OnInit} from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Question } from '../../models';
// import {AgmCoreModule} from '@agm/core'
@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.css']
})
export class UserActionsComponent {
  question:Question={
    id:'',
    title:'',
    content: '',
    location: '',
  }
  questions: any = [];
  constructor(private apiService: ApiServiceService) {
  }
  ngOnInit(){
    // get maps
    // this.initAutocomplete()
    this.getQuestions();

  }

  getQuestions() {
    this.apiService.getQuestions()
      .subscribe((data) => {
          this.questions = data
          console.log(this.questions);
      }, error => {
        console.error("Error", error);
      });
  }

  // initAutocomplete(){

  //   // Create the search box and link it to the UI element.
  //   // const input = document.getElementById("pac-input");

  //   // const searchBox = new google.maps.places.SearchBox(input);

  //   // searchBox.addListener("places_changed", () => {
  //   //   const places = searchBox.getPlaces();
  //   //   if (places.length == 0) {
  //   //     return;
  //   //   }
  //   // });
  // }
  signOut(){
    this.apiService.signOut().subscribe(data => {
      localStorage.removeItem('api_key');
    })
    localStorage.removeItem('api_key');
    location.href="http://localhost:4200"
  }

  favorites(){
    console.log("favorites")
  }

  postQuestion(){
    this.apiService.postQuestion(this.question.title,this.question.content,this.question.location)
    .subscribe(data => {
      //console.log(data.questions)

      //this.questions=data.questions
    },e=>{
      let msg="Invalid Form Fields\n\n"
      if(e.error.error)
      {
        for(const field in e.error.error){
          if(e.error.error.hasOwnProperty(field))
          {
            msg+=`${field}\n`
            for (const err of e.error.errors[field]) {
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
