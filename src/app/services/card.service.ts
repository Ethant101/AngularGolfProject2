import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cardRef: AngularFirestoreCollection;
  
  constructor(
    private db: AngularFirestore,
  ) { 
    this.cardRef = this.db.collection('games');
  }

  generateCard(gameSpecs: Game) {
    console.log(gameSpecs);
    this.cardRef.add(gameSpecs); //.then to access other stuff
   }
  
}
