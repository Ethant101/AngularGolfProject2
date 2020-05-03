import { Component, OnInit } from '@angular/core';
import { CourseAPIService } from '../../services/course-api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  courseList;


  constructor(
    public courseAPIService: CourseAPIService,
  ) { }

  ngOnInit(): void {
    this.courseAPIService.getCoursesObservable().subscribe(courses => {
      this.courseList = courses.courses;
    })
  }

}
