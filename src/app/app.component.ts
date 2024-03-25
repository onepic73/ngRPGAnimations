import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { jello, tada, backOutRight, rubberBand, bounceInDown, shakeY} from "ng-animate";
import { delay, lastValueFrom, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('jello', [transition(':increment', useAnimation(rubberBand, {params: {timing: 2}}))]),
    trigger('tada', [transition(':increment', useAnimation(tada, {params: {timing: 2}}))]),
    trigger('backOutRight', [transition(':increment', useAnimation(backOutRight, {params: {timing: 2}}))]),
    trigger('enter', [transition(':increment', useAnimation(bounceInDown, {params: {timing: 1}}))]),
    trigger('enter', [transition(':increment', useAnimation(jello, {params: {timing: 10}}))]),
    trigger('burn', [transition(':increment', useAnimation(shakeY, {params: {timing: 1}}))]),

  ]
})
export class AppComponent {
  ng_shake = 0;
  ng_bounce = 0;
  ng_flip = 0;
  ng_jello = 0;
  ng_burn = 0;
  ng_tada = 0;
  ng_backOutRight = 0;
  ng_enter = 0;

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

  enter() {
    // Jouer 2 animations (ajouter celle de jello) et rendre invisible au tout début!
    this.ng_enter++;
  }

  hit(){
    this.ng_jello++;
  }

  attack(){
    // TODO: Augment the intensity of the movement!
    this.ng_tada++;
  }

  flee(){
    // Garder le blob caché après!
    this.ng_backOutRight++;
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

  death(){
    // Make it dissovle (lowering opacity, widening a bit and squeazing down!)
  }

  // TODO: Make an idle breathing animation?
}
