import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseAPIService } from '../../services/course-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  playerObject = {name:"", handicap:false}

  id;
  numPlayers = [];
  courseInfo;
  courseForm: FormGroup;
  
  courseSpec = {
    players: [],
    difficulty: "",

  }

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


    this.courseForm = new FormGroup(
      {
        'players': new FormControl(this.courseSpec.players, Validators.required),
        'difficulty': new FormControl(this.courseSpec.difficulty, Validators.required),
      }
    );
  }

  HandleNumPlayers(n): void {
    if (this.numPlayers.length >= 0 && n > 0)
      this.numPlayers.push(this.playerObject);
    if (this.numPlayers.length > 0 && n < 0)
      this.numPlayers.shift();
    if (this.numPlayers.length === 0 && n < 0)
      alert('you cannot have negative players')
  }

}
