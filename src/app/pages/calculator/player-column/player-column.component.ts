import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalculatorService } from '../../../services/calculator.service';

@Component({
  selector: 'app-player-column',
  imports: [ReactiveFormsModule],
  templateUrl: './player-column.component.html',
  styleUrl: './player-column.component.scss',
})
export class PlayerColumnComponent implements OnInit {
  player = input.required<FormGroup>();
  controlNames: string[] = [];
  total = signal<number>(0);

  private destroyRef = inject(DestroyRef);
  private calculatorService = inject(CalculatorService);

  ngOnInit() {
    Object.keys(this.player().controls).forEach((key) => {
      this.controlNames.push(key);
    });

    // Add option to keep total score hidden?
    const totalScoreSub = this.player()
      .valueChanges // .pipe(debounceTime(500))
      .subscribe(() => {
        this.total.set(
          this.calculatorService.getPlayerTotalScore(this.player())
        );
      });

    this.destroyRef.onDestroy(() => {
      totalScoreSub.unsubscribe();
    });
  }
}
