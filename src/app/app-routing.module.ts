import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseListComponent } from './components/course-list/course-list.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { CoursePageComponent } from './components/course-page/course-page.component';
import { ScoreCardComponent } from './components/score-card/score-card.component';


const routes: Routes = [
  { path: "", redirectTo: 'home', pathMatch: 'full' },
  { path: "course-page/:id", component: CoursePageComponent },
  { path: "score-card", component: ScoreCardComponent },
  { path: "home", component: CourseListComponent },
  

  // { path: '**', component: PathNotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
