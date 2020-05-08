import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from '../../models/game';
import { CourseAPIService } from '../../services/course-api.service';
import { Course } from '../../models/course';
import { Observable } from 'rxjs';
import { CardService } from '../../services/card.service';
import { Hole } from '../../models/hole';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScoreCardComponent implements OnInit {
  hardCodeHoles = [1,2,3,4,5,6,7,8,9];
  hardCodeHoles2 = [10,11,12,13,14,15,16,17,18];

  firestoreCardIds = [];

  gameId;

  games;
  currentGame;
  cardRef;
  gameSpec$: Observable<Course>;

  constructor(
    private db: AngularFirestore,
    private courseAPIService: CourseAPIService,
    private cardService: CardService,
    private activatedRoute: ActivatedRoute,

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
      this.currentGame = c[this.gameId ];
      this.gameSpec$ = this.courseAPIService.getCourseByIdObservable(this.games[this.gameId].courseID); 
      console.log('subscription', c);
    })
  }
  ngOnInit(): void {
    this.gameId = this.activatedRoute.snapshot.paramMap.get('id');
    // this.games = this.cardService.games;
    // this.currentGame = this.cardService.currentGame;
    // this.cardRef = this.cardService.cardRef;
    // this.gameSpec$ = this.cardService.gameSpec$;
  }
  saveCard(card: Game) {
    console.log(this.firestoreCardIds)
    this.db.collection('games').doc(this.firestoreCardIds[this.gameId]).set(card)
  }

  total(holes: Hole[], type, start, end, playerIndex?) {
    let total = 0;
    if (type === 'par' || type == 'yards' || type == 'hdc') {
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
