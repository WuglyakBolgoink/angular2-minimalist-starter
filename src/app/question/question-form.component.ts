import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Validators } from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder } from '@angular/forms';
import { Question } from '../app.model';


@Component({
  selector: 'my-question-form',
  templateUrl: './question-form.component.html',
  encapsulation: ViewEncapsulation.None,
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class QuestionFormComponent implements OnInit {

  myForm: FormGroup;
  submitted: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  save(model: Question) {
    console.log('question', model);
    this.submitted = true;
  }

}
