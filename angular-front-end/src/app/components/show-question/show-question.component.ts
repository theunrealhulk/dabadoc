import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.css']
})
export class ShowQuestionComponent {
  ngOnInit(){
    console.log('loading current question')
  }
}
