import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';
import { IonToolbar, IonButtons, IonButton, IonMenuButton, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonIcon, IonLabel, IonList, IonItem, IonImg, IonRippleEffect } from '@ionic/angular/standalone';

import { HeaderComponent } from '../header/header.component';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FooterComponent } from '../footer/footer.component';
import { ShuffleComponent } from '../shuffle/shuffle.component';
import { gsap } from 'gsap';

// import model from '../../assets/facefull.glb'
import { CanvasCaseComponent } from '../canvas-case/canvas-case.component';

import { chevronDownOutline, sendOutline, rocketOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { Subscription } from 'rxjs';
import { DarkModeService } from '../darkmode.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [IonRippleEffect, RouterLink, NgForOf, IonImg, IonItem, IonList, IonIcon, IonLabel, IonRow, IonCol, IonGrid, IonToolbar, IonButtons, IonButton, IonMenuButton, IonTitle, IonContent, HeaderComponent, FooterComponent, ShuffleComponent, CanvasCaseComponent],
    standalone: true
})
export class HomeComponent  implements OnInit, OnDestroy {  
  private timeline: GSAPTimeline | null = null;
  isDarkMode = false;
  private darkModeSub: Subscription | null = null;
  private darkModeService = inject(DarkModeService);

  lightModeImage = 'assets/Me-Nov-24-NEW.jpg'
  darkModeImage = 'assets/Me-Dark-Dec24.jpg'

  projects = [
    { title: 'The Sprinkler Guy', description: 'Business Website', url: 'thesprinklerguyjb.com', img: "" },
    { title: 'Project 2', description: 'Description of project 2', url: 'some.com',
      img: "" },
    // Add more projects as needed
  ];

  constructor() { 
    addIcons({ chevronDownOutline, sendOutline, rocketOutline })
  }

  ngOnInit(): void {
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
      { opacity: 1, duration: 1.7, ease: 'sin.inOut' }
    );
    console.log('nothing')
  }
}
