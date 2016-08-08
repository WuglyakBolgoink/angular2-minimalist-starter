import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../shared/services';
import { Question } from '../shared/interfaces';

@Component({
  selector: 'my-question-detail',
  templateUrl: './question-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
export class QuestionDetailComponent {

  question: Question = {};

  constructor(private route: ActivatedRoute, private questionService: QuestionService) {
  }

  ngOnInit() {
    
    const id = this.route.snapshot.params['id'];

    this.questionService.findOne(id).subscribe(question => {
      this.question = question;
    });
  }

}
