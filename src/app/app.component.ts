import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { Card } from './models/card';

@Component({
  selector: 'app-root',
  imports: [NgFor, NgIf, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Memory Game';

  cards: Card[] = [];
  flippedCardIDs: number[] = [];
  cardsMatched: boolean[] = [];

  moves: number = 0;
  pairsFound: number = 0;
  isWin: boolean = false;

  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.cards = this.generateCards();
    this.flippedCardIDs = [];
    this.cardsMatched = Array(this.cards.length).fill(false);
    this.moves = 0;
    this.pairsFound = 0;
    this.isWin = false;
  }

  flipCard(id: number) {
    const selectedCard = this.cards.find(card => card.id === id);

    if (!selectedCard) {
      return;
    }

    if (selectedCard.isFlipped || this.cardsMatched[id]) {
      return;
    }

    if (this.flippedCardIDs.length < 2) {
      selectedCard.isFlipped = true;
      this.flippedCardIDs.push(id);

      if (this.flippedCardIDs.length === 2) {
        this.moves++;
        this.checkForMatching();
      }
    }
  }

  private generateCards(): Card[] {
    const images = ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png', 'image6.png'];
    const duplicatedImages = [...images, ...images];

    const initialCards = duplicatedImages.map((image, index) => (
      { id: index, image, back: 'card-back.png', isFlipped: false, isMatched: false }
    ));

    return this.shuffleCards(initialCards);
  }

  private shuffleCards(cards: Card[]): Card[] {
    for (let index = cards.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];
    }
    return cards;
  }

  private checkForMatching() {
    const [firstCardId, secondCardId] = this.flippedCardIDs;

    const firstCard = this.cards.find(card => card.id === firstCardId);
    const secondCard = this.cards.find(card => card.id === secondCardId);

    if (!firstCard || !secondCard) {
      return;
    }

    const firstCardImage = firstCard.image;
    const secondCardImage = secondCard.image;

    if (firstCardImage === secondCardImage) {
      this.cardsMatched[firstCardId] = true;
      this.cardsMatched[secondCardId] = true;
      firstCard.isMatched = true;
      secondCard.isMatched = true;
      this.pairsFound++;

      if (this.pairsFound * 2 === this.cards.length) {
        this.isWin = true;
      }
    }

    setTimeout(() => {
      firstCard.isFlipped = false;
      secondCard.isFlipped = false;
      this.flippedCardIDs = [];
    }, 800);
  }
}
