import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Question } from 'src/app/models';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.css']
})
export class ShowQuestionComponent {
  question:any={}
  constructor(private apiService: ApiServiceService){}
  ngOnInit(){
    const questionId=location.href.split('id=')[1]
    console.log(questionId);
    this.apiService.getQuestion(questionId).subscribe((data)=>{
      this.question = data;
      console.log(this.question)
    })

  }
}
