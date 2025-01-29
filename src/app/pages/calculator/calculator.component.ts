import { Component, OnInit } from '@angular/core';
import { PlayerModel } from '../../models/player.model';
import { PlayerColumnComponent } from './player-column/player-column.component';

@Component({
  selector: 'app-calculator',
  imports: [PlayerColumnComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent implements OnInit {
  players: PlayerModel[] = [];

  ngOnInit() {
    this.players.push(new PlayerModel());
    this.players.push(new PlayerModel());
    this.players.push(new PlayerModel());
  }
}
