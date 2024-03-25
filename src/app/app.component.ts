import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { jello, tada, backOutRight, rubberBand, bounceInDown, shakeY, shakeX, pulse} from "ng-animate";
import { delay, lastValueFrom, timer } from 'rxjs';

// Même durée que l'animation de FadeIn
const SPAWN_DURATION_MS = 500;

// Même durée que l'animation de FadeOut
const DEATH_DURATION_SECONDS = 0.5;
const DEATH_DURATION_MS = DEATH_DURATION_SECONDS * 1000;

const FLEE_DURATION_SECONDS = 1;
const FLEE_DURATION_MS = FLEE_DURATION_SECONDS * 1000;

const ATTACK_PULSE_DURATION_SECONDS = 0.3;
const ATTACK_PULSE_DURATION_MS = ATTACK_PULSE_DURATION_SECONDS * 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('death', [transition(':increment', useAnimation(shakeX, {params: {timing: DEATH_DURATION_SECONDS}}))]),
    
    
    trigger('jello', [
      transition(':increment', useAnimation(jello, {params: {timing: 0.5}}))
    ]),
    trigger('tada', [transition(':increment', useAnimation(pulse, {params: {timing: ATTACK_PULSE_DURATION_SECONDS, scale: 3.5}}))]),
    trigger('backOutRight', [transition(':increment', useAnimation(backOutRight, {params: {timing: FLEE_DURATION_SECONDS}}))]),
    trigger('enter', [transition(':increment', useAnimation(jello, {params: {timing: 10}}))]),
  ]
})
export class AppComponent {
  slimeIsPresent = false;
  cantInteractWithSlime = false;

  ng_death = 0;


  ng_bounce = 0;
  ng_flip = 0;
  ng_jello = 0;
  ng_tada = 0;
  ng_backOutRight = 0;
  ng_spawn = 0;

  css_shake_infinite= false;
  css_bounce_infinite = false;

  css_shake= false;
  css_bounce = false;
  css_flip = false;

  css_hit = false;

  constructor() {
  }

  waitUntilEndOfAnimation(delay:number){
    this.cantInteractWithSlime = true;
    setTimeout(() => this.cantInteractWithSlime = false, delay);
  }

  showSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
  }

  hideSlime(){
    var element = document.getElementById("slimey");
    element?.classList.remove("fadeIn");
    element?.classList.add("fadeOut");
  }

  spawn() {
    this.slimeIsPresent = true;
    // Simple showSlime
    this.showSlime();
    // TODO: Montrer l'importance de forwards!
    this.waitUntilEndOfAnimation(SPAWN_DURATION_MS);
  }

  death(){
    this.slimeIsPresent = false;
    this.hideSlime();
    // Ajout d'une animation angular
    this.ng_death++;
    this.waitUntilEndOfAnimation(DEATH_DURATION_MS);
  }

  flee(){
    // TODO: Garder le blob caché après!
    this.ng_backOutRight++;
    this.slimeIsPresent = false;
    this.waitUntilEndOfAnimation(FLEE_DURATION_MS);
  }

  attack(){
    // TODO: Augmenter l'intensité du mouvement avec scale (Regarder dans le code!)
    // TODO: Jouer une animation juste avant!
    this.ng_tada++;
  }

  hit(){
    //Utilisé anamista pour faire une animation différente avec css (wobble)
    this.css_hit = true;
    setTimeout(() => this.css_hit = false, 800);
  }
}
