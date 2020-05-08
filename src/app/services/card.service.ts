import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Game } from '../models/game';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cardRef: AngularFirestoreCollection;
  games;
  
  constructor(
    private db: AngularFirestore,
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
      console.log('subscription', c);
    })
  }

  generateCard(gameSpecs: Game) {
    console.log(gameSpecs);
    this.cardRef.add(gameSpecs); //.then to access other stuff
   }
  
}
