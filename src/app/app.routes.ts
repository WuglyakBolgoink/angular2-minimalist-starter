import { provideRouter, RouterConfig }  from '@angular/router';
import { QuestionListComponent } from './question/question-list.component';
import { QuestionFormComponent } from './question/question-form.component';
import { QuestionDetailComponent } from './question/question-detail.component';
import { AboutComponent } from './about/about.component';

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: 'questions',
    pathMatch: 'full'
  },
  {
    path: 'questions',
    component: QuestionListComponent
  }, 
  {
    path: 'questions/add',
    component: QuestionFormComponent
  },      
  {
    path: 'question/:id',
    component: QuestionDetailComponent
  },
  {
    path: 'question/:id/edit',
    component: QuestionFormComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
