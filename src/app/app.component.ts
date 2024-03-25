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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('shake', [transition(':increment', useAnimation(shakeX, {params: {timing: DEATH_DURATION_SECONDS}}))]),
    trigger('jello', [transition(':increment', useAnimation(rubberBand, {params: {timing: 2}}))]),
    trigger('tada', [transition(':increment', useAnimation(pulse, {params: {timing: 0.5, scale: 2.5}}))]),
    trigger('backOutRight', [transition(':increment', useAnimation(backOutRight, {params: {timing: FLEE_DURATION_SECONDS}}))]),
    trigger('enter', [transition(':increment', useAnimation(jello, {params: {timing: 10}}))]),
    trigger('burn', [transition(':increment', useAnimation(shakeY, {params: {timing: 1}}))]),

  ]
})
export class AppComponent {
  slimeIsPresent = false;
  cantInteractWithSlime = false;

  ng_shake = 0;
  ng_bounce = 0;
  ng_flip = 0;
  ng_jello = 0;
  ng_burn = 0;
  ng_tada = 0;
  ng_backOutRight = 0;
  ng_spawn = 0;

  css_shake_infinite= false;
  css_bounce_infinite = false;

  css_shake= false;
  css_bounce = false;
  css_flip = false;

  constructor() {
  }

  ngShakeMeInfinite() {
    this.ng_shake++;
    setTimeout(() => {
      this.ngBounceMeInfinite();
    },2000);
  }

  ngBounceMeInfinite() {
    this.ng_bounce++;
    setTimeout(() => {
      this.ngShakeMeInfinite();
    },2000);
  }

  shakeMeInfinite() {
    this.css_shake_infinite = true;
    setTimeout(() => {
      this.css_shake_infinite = false;
      this.bounceMeInfinite();
    },2000);
  }

  bounceMeInfinite() {
    this.css_bounce_infinite = true;
    setTimeout(() => {
      this.css_bounce_infinite = false;
      this.shakeMeInfinite();
    },2000);
  }



  async shakeAndBounceMeInfinite2() {
    while(true){
      this.css_bounce_infinite = true;
      await lastValueFrom(timer(2000));
      this.css_bounce_infinite = false;
      this.css_shake_infinite = true;
      await lastValueFrom(timer(2000));
      this.css_shake_infinite = false;
    }
  }

  async ngShakeAndBounceMeInfinite2() {
    while(true){
      this.ng_bounce++;
      await lastValueFrom(timer(2000));
      this.ng_shake++;
      await lastValueFrom(timer(2000));
    }
  }

  shakeMe() {
    this.css_shake = true;
    setTimeout(() => {this.css_shake = false;},2000);
  }

  bounceMe() {
    this.css_bounce = true;
    setTimeout(() => {this.css_bounce = false;},2000);
  }

  flipMe() {
    this.css_flip = true;
    setTimeout(() => {this.css_flip = false;},2000);
  }

  shakeFlipAndBounce1() {
    this.shakeMe();
    setTimeout(() => {
      this.flipMe()
      setTimeout(() => {
        this.bounceMe()
      }, 2000);
    }, 2000);
  }

  shakeFlipAndBounce2() {
    this.css_shake = true;

    setTimeout(() => {
      this.css_shake = false;
      this.css_flip = true;
    },2000);

    setTimeout(() => {
      this.css_flip = false;
      this.css_bounce = true;
    },4000);

    setTimeout(() => {
      this.css_bounce = false;
    },6000);
  }

  async shakeFlipAndBounce3() {
    this.shakeMe();
    await lastValueFrom(timer(2000));
    this.flipMe();
    await lastValueFrom(timer(2000));
    this.bounceMe();
  }

  waitUntilEndOfAnimation(delay:number){
    this.cantInteractWithSlime = true;
    setTimeout(() => this.cantInteractWithSlime = false, delay);
  }

  showSlime(){
    this.slimeIsPresent = true;
    var element = document.getElementById("slimey");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
  }

  hideSlime(){
    this.slimeIsPresent = false;
    var element = document.getElementById("slimey");
    element?.classList.remove("fadeIn");
    element?.classList.add("fadeOut");
  }

  spawn() {
    // Simple showSlime
    this.showSlime();
    this.waitUntilEndOfAnimation(SPAWN_DURATION_MS);
  }

  death(){
    // Ajout d'une animation angular
    this.hideSlime();
    this.ng_shake++;
    this.waitUntilEndOfAnimation(DEATH_DURATION_MS);
  }

  flee(){
    // Garder le blob caché après!
    this.ng_backOutRight++;
    this.slimeIsPresent = false;
    this.waitUntilEndOfAnimation(FLEE_DURATION_MS);
  }

  hit(){
    this.ng_jello++;
  }

  attack(){
    // TODO: Augment the intensity of the movement!
    this.ng_tada++;
  }

  burn(){
    // Find a burning animation!
    this.ng_burn++;
  }

  scaleUp(){
    // Make it scale!
    // Utiliser le css pour cette partie (ou une animation manuelle en tout cas)
  }

  addCrown(){
    // Make it scale! + Add a Crown!
  }

  

  // TODO: Make an idle breathing animation?
}
