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
    _id: { $oid: '' },
    title:'',
    content: '',
    location: '',
    favorites:[]
  }
  questions: any = [];
  favoriteQuestions: any = [];
  currentUser:any
  constructor(private apiService: ApiServiceService) {
  }
  ngOnInit(){

    this.getQuestions();
    this.getAuthUser()
  }
  getAuthUser(){
    this.apiService.getUser().subscribe((data:any)=>{
    this.currentUser=data.user;
    // console.log(this.currentUser.favorites)
    })
  }
  getQuestions() {
    this.apiService.getQuestions()
      .subscribe((data) => {
          this.questions = data
          this.favoriteQuestions=data
          // console.log(this.questions);
      }, error => {
        console.error("Error", error);
      });
  }

  signOut(){
    this.apiService.signOut().subscribe(data => {
      localStorage.removeItem('api_key');
    })
    localStorage.removeItem('api_key');
    location.href="http://localhost:4200"
  }

  favorites(){
     if(this.favoriteQuestions.length>=this.questions.length){
      this.favoriteQuestions = this.favoriteQuestions.filter( (question:Question) => this.currentUser?.favorites.includes(question._id.$oid));
     }
     else{
       this.favoriteQuestions = this.questions
     }
  }

  postQuestion(){
    this.apiService.postQuestion(this.question.title,this.question.content,this.question.location)
    .subscribe(data => {
      this.questions = data
      this.favoriteQuestions=data
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

  likeToggle(event: any,qId:string) {

    const clickedElement = event.currentTarget;
    console.log('clickedElement',clickedElement.querySelector('i').classList);
    if(clickedElement.querySelector('i').classList.contains('bi-heart-fill'))
    {
      clickedElement.querySelector('i').classList.remove('bi-heart-fill');
      clickedElement.querySelector('i').classList.add('bi-heart');
    }else{
      clickedElement.querySelector('i').classList.add('bi-heart-fill');
      clickedElement.querySelector('i').classList.remove('bi-heart');
    }


    this.apiService.likeToggle(qId).subscribe(data=>{
      console.log(data)
    })
  }
  showQuestion(qId:string){
    console.log('showQuestion',qId)


  }
  openPostAnswer(qId:string){
    console.log('openPostAnswer',qId)

    const answer=prompt('Enter your answer')
    console.log(answer)
    if(answer){
      this.apiService.postAnswer(qId , answer).subscribe((data)=>{
        this.questions = data
        this.favoriteQuestions=data
      })
    }
  }

}
