import { Component, computed, inject, input, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { PlayerModel } from '../../../models/player.model';
import { combineLatest, debounceTime, delay, delayWhen, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-player-column',
  imports: [ReactiveFormsModule],
  templateUrl: './player-column.component.html',
  styleUrl: './player-column.component.scss'
})
export class PlayerColumnComponent implements OnInit, OnDestroy {

  form = signal<FormGroup>(new FormGroup({}));
  private fb = inject(FormBuilder);
  
  name = signal<string>('');
  birds = signal<number>(0);
  bonusCards = signal<number>(0);
  endOfRoundGoals = signal<number>(0);
  eggs = signal<number>(0);
  foodOnCards = signal<number>(0);
  tuckedCards = signal<number>(0);
  nectar = signal<number>(0);

  totalScore = computed(() => {
    return this.birds() + 
    this.bonusCards() + 
    this.endOfRoundGoals() + 
    this.eggs() + 
    this.foodOnCards() + 
    this.tuckedCards() + 
    this.nectar();
  });

  private formSubscriptions: Subscription[] = [];

  ngOnInit() {
    this.initForm();
    this.setupFormValueChange();
  }

  ngOnDestroy() {
    this.formSubscriptions.forEach(sub => sub.unsubscribe());
  }

  initForm() {
    this.form().addControl('name', this.fb.control('', Validators.required));
    this.form().addControl('birds', this.fb.control(0, Validators.required));
    this.form().addControl('bonusCards', this.fb.control(0, Validators.required));
    this.form().addControl('endOfRoundGoals', this.fb.control(0, Validators.required));
    this.form().addControl('eggs', this.fb.control(0, Validators.required));
    this.form().addControl('foodOnCards', this.fb.control(0, Validators.required));
    this.form().addControl('tuckedCards', this.fb.control(0, Validators.required));
    this.form().addControl('nectar', this.fb.control(0, Validators.required));
  }

  setupFormValueChange() {
    // .pipe(debounceTime(500))
    this.formSubscriptions.push(
      this.form().get('birds')!.valueChanges.subscribe((value) => { this.birds.set(value) }),
      this.form().get('bonusCards')!.valueChanges.subscribe((value) => { this.bonusCards.set(value) }),
      this.form().get('endOfRoundGoals')!.valueChanges.subscribe((value) => { this.endOfRoundGoals.set(value) }),
      this.form().get('eggs')!.valueChanges.subscribe((value) => { this.eggs.set(value) }),
      this.form().get('foodOnCards')!.valueChanges.subscribe((value) => { this.foodOnCards.set(value) }),
      this.form().get('tuckedCards')!.valueChanges.subscribe((value) => { this.tuckedCards.set(value) }),
      this.form().get('nectar')!.valueChanges.subscribe((value) => { this.nectar.set(value) })
    )
  }

}
