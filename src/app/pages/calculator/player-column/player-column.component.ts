import { Component, input, OnInit } from '@angular/core';
import { PlayerModel } from '../../../models/player.model';

@Component({
  selector: 'app-player-column',
  imports: [],
  templateUrl: './player-column.component.html',
  styleUrl: './player-column.component.scss'
})
export class PlayerColumnComponent implements OnInit {
  player = input.required<PlayerModel>()

  ngOnInit() {
    this.player()
  }
}
