import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";

// Même durée que l'animation de FadeIn
const SPAWN_DURATION_MS = 500;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  slimeIsPresent = false;
  cantInteractWithSlime = false;
  
  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    // Simple showSlime, Montrer l'importance de forwards!
    // TODO: Montrer l'importance de forwards!
  }

  death(){
    this.slimeIsPresent = false;
    // TODO Cacher le slime
    
    // TODO Déclencher une animation angular pour la mort
    
    // TODO [Plus tard] Désactiver les boutons pendant que l'animation roule
  }

  attack(){
    // TODO Augmenter l'intensité du mouvement avec scale (Regarder dans le code!)
    // TODO Jouer une animation juste avant!
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
  }
}
