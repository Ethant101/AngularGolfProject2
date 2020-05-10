import { Component, OnInit } from '@angular/core';
import { CourseAPIService } from '../../services/course-api.service';
import { CardService } from '../../services/card.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from '../../models/game';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courseList;
  firestoreCardIds = [];
  games;

  constructor(
    public courseAPIService: CourseAPIService,
    private cardService:CardService,
    private db: AngularFirestore,
  ) { 
    this.db.collection('games').snapshotChanges().pipe(
      map(games => {
        this.firestoreCardIds = [];
        return games.map(game => {
          this.firestoreCardIds.push(game.payload.doc.id);
          return game.payload.doc.data() as Game;
        })
      })
    ).subscribe(c => {
      this.games = c;
      console.log('subscription', c);
    })
  }

  ngOnInit(): void {
    this.courseAPIService.getCoursesObservable().subscribe(courses => {
      this.courseList = courses.courses;
    })
  }

  deleteGame(index) {
    this.db.collection('games').doc(this.firestoreCardIds[index]).delete();
  }
}
