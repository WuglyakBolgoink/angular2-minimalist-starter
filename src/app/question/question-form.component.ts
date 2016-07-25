import { Component, ViewEncapsulation } from '@angular/core';
import { Question } from '../app.model';


@Component({
  selector: 'my-question-form',
  templateUrl: './question-form.component.html',
  encapsulation: ViewEncapsulation.None
})
export class QuestionFormComponent {

  model: Question;

  constructor() {
    this.newQuestion();
  }

  onSubmit() {
    console.log(this.model);
  }

  newQuestion() {
    this.model = {};
  }

}
