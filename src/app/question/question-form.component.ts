import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Autofocus } from '../directives/autofocus';
import { Question } from './question.model';
import { QuestionService } from './question.service';


@Component({
  selector: 'my-question-form',
  templateUrl: './question-form.component.html',
  encapsulation: ViewEncapsulation.None,
  directives: [REACTIVE_FORM_DIRECTIVES, Autofocus]
})
export class QuestionFormComponent implements OnInit {

  question: Question = {};
  submitted: boolean;

  constructor(private router: Router, private route: ActivatedRoute,
    private questionService: QuestionService) {
  }

  ngOnInit() {
    
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.questionService.findOne(id).subscribe(question => {
        this.question = question;
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    this.questionService.saveOne(this.question).subscribe(saved => {
      this.router.navigate(['/question', saved.id]);
    });
  }

}
