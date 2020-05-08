import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from '../../models/game';
import { CourseAPIService } from '../../services/course-api.service';
import { Course } from '../../models/course';
import { Observable } from 'rxjs';
import { CardService } from '../../services/card.service';


@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScoreCardComponent implements OnInit {
hardCodeHoles = [1,2,3,4,5,6,7,8,9];
hardCodeHoles2 = [10,11,12,13,14,15,16,17,18];


  games;
  currentGame;
  cardRef;
  gameSpec$: Observable<Course>;

  constructor(
    private db: AngularFirestore,
    private courseAPIService: CourseAPIService,
    private cardService: CardService,
  ) {

  }
  ngOnInit(): void {
    // this.courseId = this.activatedRoute.snapshot.paramMap.get('id');

    // this.gameSpec$ = this.courseAPIService.getCourseByIdObservable(this.games[0].courseID); 
  }
  saveCard() {
    
  }

}
