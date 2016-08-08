import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { QuestionService } from '../shared/services';
import { Question } from '../shared/interfaces';

@Component({
  selector: 'my-question-list',
  templateUrl: './question-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  pipes: [AsyncPipe],
  directives: [ROUTER_DIRECTIVES]
})
export class QuestionListComponent implements OnInit {

  questions: Observable<Question>;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.find();
  }

  find() {
    this.questions = this.questionService.find();
  }

  remove(question: Question) {
    this.questionService.removeOne(question.id).subscribe(resp => {
      this.find();
    });
  }

}
