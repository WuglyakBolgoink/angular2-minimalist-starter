import { provideRouter, RouterConfig }  from '@angular/router';
import { QuestionsComponent } from './question/questions.component';
import { AboutComponent } from './about/about.component';

const routes: RouterConfig = [
  {
    path: '',
    component: QuestionsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
