import { Component, OnInit } from '@angular/core';
import { PlayerModel } from '../../models/player.model';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent implements OnInit {
  players: PlayerModel[] = [];

  ngOnInit() {
    this.players.push(new PlayerModel());
  }
}
