import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseAPIService } from '../../services/course-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  playerObject = {name:"", handicap:false, holes: []}

  courseInfo;
  courseForm: FormGroup;
  
  courseSpec:Game = {
    courseID: undefined,
    dateCreated: new Date(),
    difficulty: "",
    players: []
  }



  constructor(
    private activatedRoute: ActivatedRoute,
    private courseAPIService: CourseAPIService,
    private cardService: CardService
  ) { }

  ngOnInit(): void {
    this.courseSpec.courseID = this.activatedRoute.snapshot.paramMap.get('id');
    this.courseAPIService.getCourseByIdObservable(this.courseSpec.courseID).subscribe(course => {
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
    if (this.courseSpec.players.length >= 0 && n > 0)
      this.courseSpec.players.push({...this.playerObject});
    if (this.courseSpec.players.length > 0 && n < 0)
      this.courseSpec.players.shift();
    if (this.courseSpec.players.length === 0 && n < 0)
      alert('you cannot have negative players')
  }
  
  generateCard() {
    this.cardService.generateCard(this.courseSpec);
  }

}
