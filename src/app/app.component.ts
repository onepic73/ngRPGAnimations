import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import {shakeX} from "ng-animate";

// Même durée que l'animation de FadeIn
const SPAWN_DURATION_MS = 500;

const DEATH_DURATION_SECONDS = 0.5;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('death', [transition(':increment', useAnimation(shakeX, {params: {timing: DEATH_DURATION_SECONDS}}))]),
  ]
  
})
export class AppComponent {
  slimeIsPresent = false;
  cantInteractWithSlime = false;

  ng_death = 0;
  
  constructor() {
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

  spawn() {
    this.slimeIsPresent = true;
    // Utiliser showSlime pour afficher Slimey
    this.showSlime();
  }

  death(){
    this.slimeIsPresent = false;
    // TODO Cacher le slime
    this.hideSlime();
    // TODO Déclencher une animation angular pour la mort
    this.ng_death++;
    // TODO [Plus tard] Désactiver les boutons pendant que l'animation roule
  }

  flee(){
    // TODO ???
    // TODO Garder le blob caché après!
  }

  attack(){
    // TODO Augmenter l'intensité du mouvement avec scale (Regarder dans le code!)
    // TODO Jouer une animation juste avant!
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
  }
}
