import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
import { IonToolbar, IonButtons, IonButton, IonMenuButton, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonIcon, IonLabel, IonList, IonItem, IonImg, IonRippleEffect, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

import { HeaderComponent } from '../header/header.component';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FooterComponent } from '../footer/footer.component';
import { ShuffleComponent } from '../shuffle/shuffle.component';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'

// import model from '../../assets/facefull.glb'
import { CanvasCaseComponent } from '../canvas-case/canvas-case.component';

import { sendOutline, rocketOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { Subscription } from 'rxjs';
import { DarkModeService } from '../darkmode.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [IonRippleEffect, RouterLink, NgForOf, IonImg, IonItem, IonList, IonIcon, IonLabel, IonRow, IonCol, IonGrid, IonToolbar, IonButtons, IonButton, IonMenuButton, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader,
    IonCardSubtitle, IonCardTitle, HeaderComponent, FooterComponent, ShuffleComponent, CanvasCaseComponent, CommonModule],
    standalone: true
})
export class HomeComponent  implements OnInit, OnDestroy {  
  private timeline: GSAPTimeline | null = null;
  isDarkMode = false;
  private darkModeSub: Subscription | null = null;
  private darkModeService = inject(DarkModeService);
  
  lightModeImage = 'assets/Me-Nov-24-NEW.jpg'
  darkModeImage = 'assets/Me-Dark-Dec24.jpg'
  // sprinkerlerGuy = 'assets/sprinklerguy.png'

  projects = [
    { title: 'The Sprinkler Guy', description: 'Business Website', url: 'thesprinklerguyjb.com', img: 'assets/sprinklerguy.png', details: 'VueJs website, with ThreeJs transition, GSAP, Goolge Maps, Google Recaptcha' },
    { title: 'Tomcatbuzz', description: 'Nuxt playground website test', url: 'tomcatbuzzweb.web.app/',
      img: 'assets/tomcatbuzz.png', details: 'NuxtJS website, with ThreeJs, GSAP, Google Recaptcha' },
    
  ];

  constructor() { 
    addIcons({ sendOutline, rocketOutline })
  }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.darkModeSub = this.darkModeService.isDarkMode$
      .subscribe(isDark => {
        this.isDarkMode = isDark;
      })
    this.init();
    // this.animate();
    // this.onWindowResize()
  }

  ngOnDestroy(): void {
    if (this.timeline) {
      this.timeline.kill();
    }
    this.darkModeSub?.unsubscribe();
  }
    
  init() {
    this.timeline = gsap.timeline({ 
      defaults: {
        duration: 2, 
        ease: 'power1.in',
        delay: 1
      } 
    });
    // this.timeline.fromTo('.canvasWrapper', { opacity: 0 },
    //   { opacity: 1, duration: 1.7, ease: 'sin.inOut' }
    // );
    this.timeline.fromTo('.hero-text', { opacity: 0 },
      { opacity: 1, duration: 1.7, ease: 'sin.inOut' }
    );
    this.timeline.fromTo('.image-container', { opacity: 0 },
      { opacity: 1, duration: 1.3, ease: 'sin.inOut' }
    );
    console.log('nothing')
  }
}
