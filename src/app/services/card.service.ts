import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Game } from '../models/game';
import { map } from 'rxjs/operators';
import { Course } from '../models/course';
import { Observable } from 'rxjs';
import { CourseAPIService } from './course-api.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cardRef: AngularFirestoreCollection;

  oldGames;
  games;

  firestoreCardIds = []

  currentGame;
  gameSpec$: Observable<Course>;
  
  constructor(
    private db: AngularFirestore,
    private courseAPIService:CourseAPIService
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

  generateCard(gameSpecs: Game) {
    console.log(gameSpecs);
    this.cardRef.add(gameSpecs); //.then to access other stuff
   }
  
}

//TODO: save and load functions, also name pipe;
// create a loadCard() that will take an id (index of card in firebase)
// save will write over card... or delete and create new one.