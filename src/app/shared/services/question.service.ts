import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Question } from '../interfaces';

@Injectable()
export class QuestionService {

  private items: Question[] = [
    {id: '1', title: 'Any title 1', text: 'Any description 1'},
    {id: '2', title: 'Any title 2', text: 'Any description 2'}
  ];

  constructor(private http: Http) { }

  find() {    
    return Observable.of(this.items);
  }

  findOne(id: string) {
    const model = this.items.find(it => it.id === id);
    return Observable.of(model);
  }

  saveOne(question: Question) {
    let saved: Question;
    if (question.id) {
      this.items = this.items.map(it => {
        if (it.id === question.id) {
          saved = Object.assign({}, it, question);
          return saved;
        }
        return it;
      });
    } else {
      saved = Object.assign({}, question, {id: `${this.items.length + 1}`});
      this.items = this.items.concat(saved);
    }
    return Observable.of(saved);
  }

  removeOne(id: string) {
    this.items = this.items.filter(it => it.id !== id);
    return Observable.of(id);
  }

} 
