import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { CardsService } from '../../services/cards.service';
import { Card } from '../../models/card';

@Component({
  selector: 'app-playground',
  imports: [NgFor, NgIf, CardComponent],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css'
})
export class PlaygroundComponent implements OnInit {
  get cards(): Card[] {
    return this.cardsService.cards;
  }

  get moves(): number {
    return this.cardsService.moves;
  }

  get isWin(): boolean {
    return this.cardsService.isWin;
  }

  constructor(private cardsService: CardsService) { }

  ngOnInit() {
    this.cardsService.startGame();
  }

  startGame() {
    this.cardsService.startGame();
  }

  flipCard(id: number) {
    this.cardsService.flipCard(id);
  }
}
