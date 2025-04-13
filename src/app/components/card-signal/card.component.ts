import { Component, input, output } from '@angular/core';
import { NgIf } from '@angular/common';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card-signal',
  imports: [NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  card = input.required<Card>();

  cardFlipped = output<number>();

  flipCard() {
    this.cardFlipped.emit(this.card().id);
  }
}
