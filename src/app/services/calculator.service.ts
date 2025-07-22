import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  getPlayerTotalScore(player: FormGroup): number {
    return Object.keys(player.controls).reduce((acc, key) => {
      if (key === 'name') {
        return acc;
      }
      const value = player.get(key)?.value;
      return acc + (value ? Number(value) : 0);
    }, 0);
  }
}
