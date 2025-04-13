import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card',
  imports: [NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() card!: Card;

  @Output() cardFlipped = new EventEmitter<number>();

  flipCard() {
    this.cardFlipped.emit(this.card.id);
  }
}
