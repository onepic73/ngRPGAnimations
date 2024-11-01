import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { shakeX, pulse, headShake, bounce, flip } from 'ng-animate';

const DEATH_DURATION_SECONDS : number = 0.5;
const PRE_ATTACK_DURATION_SECONDS: number = 0.5;
const ATTACK_DURATION_SECONDS: number = 0.3;
const HIT_WOBBLE_DURATION_SECONDS = 0.3;

const FLIP_SHAKE_SEQUENCE_DURATION_SECONDS = 0.75;
const BOUNCE_SEQUENCE_DURATION_SECONDS = 0.75;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('death', [transition(':increment', useAnimation(shakeX, {params: {timing: DEATH_DURATION_SECONDS}}))]),
    trigger('attack', [transition(':increment', useAnimation(pulse, {params:{timing:ATTACK_DURATION_SECONDS, scale:4.5, delay:PRE_ATTACK_DURATION_SECONDS}}))]),
    trigger('preAttack',[transition(':increment', useAnimation(headShake, {params:{timing:PRE_ATTACK_DURATION_SECONDS, scale:0.2}}))]),
    trigger('bounce', [transition(':increment', useAnimation(bounce, {params: {timing: DEATH_DURATION_SECONDS}}))]),
    trigger('shake', [transition(':increment', useAnimation(shakeX, {params: {timing: FLIP_SHAKE_SEQUENCE_DURATION_SECONDS}}))]),
    trigger('flip', [transition(':increment', useAnimation(flip, {params: {timing: BOUNCE_SEQUENCE_DURATION_SECONDS}}))]),
  ]
})
export class AppComponent {
  slimeIsPresent = false;

  ng_death = 0;
  ng_preAttack = 0;
  ng_Attack = 0;


  css_hit = false;

  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    // TODO Animation angular avec forwards
    this.showSlime();
    this.ng_death--;
  }

  death(){
    this.slimeIsPresent = false;
    // TODO Animation angular avec forwards
    this.hideSlime();
    // TODO 2e animation angular en même temps
    this.ng_death++;
  }

  attack(){
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    // TODO Jouer une autre animation avant
    this.ng_preAttack++;
    this.ng_Attack++;
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.css_hit = true;
    console.log("hit")
    setTimeout(() => {this.css_hit = false;}, HIT_WOBBLE_DURATION_SECONDS * 1000);
  }

  showSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
  }

  hideSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeIn");
    element?.classList.add("fadeOut");
  }

  bounceShakeFlip(){

  }

  infiniteTripleSpin(){

  }
}
