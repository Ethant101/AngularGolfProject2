import { Component, OnInit } from '@angular/core';
import { CourseAPIService } from '../../services/course-api.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courseList;


  constructor(
    public courseAPIService: CourseAPIService,
  ) { }

  ngOnInit(): void {
    this.courseAPIService.getCoursesObservable().subscribe(courses => {
      this.courseList = courses.courses;
      console.log('courses obj: ', this.courseList);
    })
  }

}
