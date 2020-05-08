import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from '../../models/game';
import { CourseAPIService } from '../../services/course-api.service';
import { Course } from '../../models/course';
import { Observable } from 'rxjs';
import { CardService } from '../../services/card.service';
import { Hole } from '../../models/hole';


@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScoreCardComponent implements OnInit {
  hardCodeHoles = [1,2,3,4,5,6,7,8,9];
  hardCodeHoles2 = [10,11,12,13,14,15,16,17,18];

  outYds: number[] = [];
  outPar: number[] = [];
  outPlayer: number[] = [];

  firestoreCardIds = []

  games;
  currentGame;
  cardRef;
  gameSpec$: Observable<Course>;

  constructor(
    private db: AngularFirestore,
    private courseAPIService: CourseAPIService,
    private cardService: CardService,
  ) {
    this.cardRef = this.db.collection('games');
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
      this.currentGame = c[0];
      this.gameSpec$ = this.courseAPIService.getCourseByIdObservable(this.games[0].courseID); 
      console.log('subscription', c);
    })
  }
  ngOnInit(): void {
    // this.courseId = this.activatedRoute.snapshot.paramMap.get('id');

    // this.gameSpec$ = this.courseAPIService.getCourseByIdObservable(this.games[0].courseID); 
    // this.cardService.firestoreCardIds
    console.log(this.gameSpec$)
  }
  saveCard(card: Game) {
    // this.db.collection('games').doc(this.firestoreCardIds[0]).set(card)
  }

  total(holes: Hole[], type, start, end, playerIndex?) {
    let total = 0;
    if (type === 'par' || type == 'yards') {
      for(let i = start; i < end; i++){
        total += holes[i].teeBoxes[this.currentGame.difficulty][type]
      }
    }
    else {
      for(let i = start; i < end; i++) {
        // first i is which player, add param to specify which player
        total += this.currentGame.players[playerIndex].holes[i]
      }
    }
    
    return total;
  }

}
