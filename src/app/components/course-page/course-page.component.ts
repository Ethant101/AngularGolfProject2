import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseAPIService } from '../../services/course-api.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  id;
  courseInfo
  constructor(
    private activatedRoute: ActivatedRoute,
    private courseAPIService: CourseAPIService,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.courseAPIService.getCourseByIdObservable(this.id).subscribe(course => {
      this.courseInfo = course.data;
      console.log('course obj: ', this.courseInfo);
    })

  }

}
