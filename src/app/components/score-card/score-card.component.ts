import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from '../../models/game';
import { CourseAPIService } from '../../services/course-api.service';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss']
})
export class ScoreCardComponent implements OnInit {
hardCodeHoles = [1,2,3,4,5,6,7,8,9];
hardCodeHoles2 = [10,11,12,13,14,15,16,17,18];


  games;
  currentGame;
  cardRef;
  gameSpecs;

  constructor(
    private db: AngularFirestore,
    private courseAPIService: CourseAPIService,
  ) {
    this.cardRef = this.db.collection('games');
    this.db.collection('games').snapshotChanges().pipe(
      map(games => {
        return games.map(game => {
          return game.payload.doc.data() as Game;
        })
      })
    ).subscribe(c => {
      this.games = c;
      this.currentGame = c[0];
      console.log('subscription', c);
    })
    

  }
  ngOnInit(): void {
    // i was trying to put the APIService call here but ngOnInit happens b4
    // the .subscribe finishes making it so it doesn't know to get this.games[0]
    // I ended up putting it in the subscribe and it returns an observable object, not actual data
  }

  async bringInfo() {
    this.gameSpecs = this.courseAPIService.getCourseByIdObservable(this.games[0].courseID); 
    console.log(this.gameSpecs)
  }

}
