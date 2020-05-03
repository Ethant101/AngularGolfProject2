import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  getCourseByIdObservable(id): Observable<any> {
    return this.http.get(`https://golf-courses-api.herokuapp.com/courses/${id}`);
  }
}
