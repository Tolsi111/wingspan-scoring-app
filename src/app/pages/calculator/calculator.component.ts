import { Component, inject, OnInit, signal } from '@angular/core';
import { WingspanPlayerTemplate } from '../../models/player.model';
import { PlayerColumnComponent } from './player-column/player-column.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-calculator',
  imports: [PlayerColumnComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent implements OnInit {
  players = signal<FormGroup[]>([]);

  private fb = inject(FormBuilder);
  private calculatorService = inject(CalculatorService);

  ngOnInit() {
    this.addPlayer();
  }

  addPlayer() {
    const newPlayer = new FormGroup({});
    WingspanPlayerTemplate.forEach((key) => {
      newPlayer.addControl(
        key,
        this.fb.control(
          '',
          key === 'name'
            ? Validators.required
            : [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]
        )
      );
    });
    this.players().push(newPlayer);
  }

  submitScore() {
    console.clear();
    console.log('Submitting scores... ');
    this.players().forEach((player) => {
      if (player.invalid) {
        // TODO: handle invalid player inputs
        console.warn(
          `Player ${player.controls['name'].value} has invalid inputs`
        );
        // Object.keys(player.controls).forEach((key) => {
        //   if (player.controls[key].invalid) {
        //     console.warn(
        //       `  - ${key} is invalid: `,
        //       player.controls[key].errors
        //     );
        //   }
        // });
        return;
      }
      console.log(
        player.controls['name'].value,
        ' has a total score of: ',
        this.calculatorService.getPlayerTotalScore(player)
      );
    });
  }
}
