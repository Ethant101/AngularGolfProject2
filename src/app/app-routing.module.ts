import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseListComponent } from './components/course-list/course-list.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { CoursePageComponent } from './components/course-page/course-page.component';


const routes: Routes = [
  { path: "", redirectTo: 'home', pathMatch: 'full' },
  { path: "course-page/:id", component: CoursePageComponent },
  { path: "home", component: CourseListComponent },
  

  // { path: '**', component: PathNotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
