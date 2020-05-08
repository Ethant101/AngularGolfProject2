import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseAPIService {

  constructor(
    private http: HttpClient,
  ) { }

    // change to type course
  getCoursesObservable(): Observable<any> {
    return this.http.get('https://golf-courses-api.herokuapp.com/courses');
  }
  getCourseByIdObservable(courseId): Observable<Course> {
    return this.http.get<any>(`https://golf-courses-api.herokuapp.com/courses/${courseId}`).pipe(
      map(coursesObj => {
        console.log(coursesObj);
        return {
          ...coursesObj.data,
          difficulties: coursesObj.data.holes[0].teeBoxes
        };
      })
    );;
  }
}
