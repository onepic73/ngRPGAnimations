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

  showSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
  }

  spawn() {
    this.slimeIsPresent = true;
    // Utiliser showSlime pour afficher Slimey
    this.showSlime();
  }

  death(){
    this.slimeIsPresent = false;
    // TODO Cacher le slime
    
    // TODO Déclencher une animation angular pour la mort
    
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
